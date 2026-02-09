import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import localforage from "localforage";

export default function EmergencyView() {

  const { token } = useParams();
  const { t, i18n } = useTranslation();

  const [plan, setPlan] = useState(null);
  const [situation, setSituation] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ======================
  SPEAK
  ====================== */
  const speak = (text) => {
    if (!text) return;

    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.9;
    msg.lang = i18n.language === "hi" ? "hi-IN" : "en-US";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };

  /* ======================
  FETCH PLAN (ONLY AFTER SITUATION)
  ====================== */
  useEffect(() => {

    if (!situation) return;

    async function loadPlan() {
      try {
        setLoading(true);

        const res = await api.get(
          `/ring/${token}?situation=${situation}`
        );

        const newPlan =
          res?.data?.plan ||
          {
            level: "LOW",
            steps: ["No instructions available"]
          };

        setPlan(newPlan);

        await localforage.setItem("lastPlan", newPlan);

      } catch {

        const cached = await localforage.getItem("lastPlan");
        if (cached) setPlan(cached);

      } finally {
        setLoading(false);
      }
    }

    loadPlan();

  }, [token, situation]);

  /* ======================
  AUTO VOICE
  ====================== */
  useEffect(() => {
    if (plan?.steps?.length)
      speak(plan.steps.join(". "));
  }, [plan, i18n.language]);

  /* ======================
  INCIDENT SMS
  ====================== */
  const sendIncident = () => {

    navigator.geolocation.getCurrentPosition((pos) => {

      const location =
        `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;

      api.post("/incident", {
        token,
        situation,
        location
      });

    });
  };

  /* ======================
  CALL
  ====================== */
  const callContact = () => {
    window.location.href = "tel:8692827954";
  };

  /* ======================
  SHARE LOCATION
  ====================== */
  const shareLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const url =
        `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
      window.open(url, "_blank");
    });
  };

  /* ======================
  STEP 1 → ASK FIRST
  ====================== */
  if (!situation) {
    return (
      <div className="card">
        <h2>🚨 What happened?</h2>

        <button onClick={() => setSituation("unconscious")}>
          Unconscious
        </button>

        <button onClick={() => setSituation("seizure")}>
          Seizure
        </button>

        <button onClick={() => setSituation("accident")}>
          Accident
        </button>
      </div>
    );
  }

  /* ======================
  LOADING
  ====================== */
  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  /* ======================
  STEP 2 → SHOW PLAN
  ====================== */
  if (!plan) return null;

  return (
    <div className="card">

      <h2>🚨 {t("emergency")}</h2>
      <h3>{t("risk")} : {plan.level}</h3>

      <div style={{ margin: "15px 0" }}>
        {plan.steps.map((s, i) => (
          <p key={i}>• {s}</p>
        ))}
      </div>

      <button className="btn-danger" onClick={callContact}>
        {t("call")}
      </button>

      <button className="btn-primary" onClick={shareLocation}>
        {t("share")}
      </button>

      <button
        style={{ marginTop: 12 }}
        onClick={sendIncident}
      >
        Send Alert + SMS
      </button>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
        <button onClick={() => i18n.changeLanguage("hi")} style={{ marginLeft: 8 }}>
          हिंदी
        </button>
      </div>

    </div>
  );
}