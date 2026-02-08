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


  /* =============================
  SPEAK
  ============================= */
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.9;
    msg.lang = i18n.language === "hi" ? "hi-IN" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  };


  /* =============================
  SHARE LOCATION
  ============================= */
  const shareLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const url =
        `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
      window.open(url, "_blank");
    });
  };


  /* =============================
  CALL CONTACT
  ============================= */
  const callContact = () => {
    window.location.href = "tel:9876543210";
  };


  /* =============================
  SEND INCIDENT (SMS trigger)
  ============================= */
  const sendIncident = (sit) => {
    navigator.geolocation.getCurrentPosition((pos) => {

      const location =
        `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;

      api.post("/incident", {
        token,
        situation: sit,
        location
      });

    });
  };


  /* =============================
  FETCH PLAN (ONLINE + OFFLINE)
  ============================= */
  useEffect(() => {

    async function load() {
      try {
        const res = await api.get(`/ring/${token}`);

        const newPlan = res?.data?.plan || {
          level: "LOW",
          steps: ["No medical instructions available"]
        };

        setPlan(newPlan);

        await localforage.setItem("lastPlan", newPlan);

      } catch {
        const cached = await localforage.getItem("lastPlan");
        if (cached) setPlan(cached);
      }
    }

    load();

  }, [token]);


  /* =============================
  AUTO VOICE
  ============================= */
  useEffect(() => {
    if (plan?.steps?.length)
      speak(plan.steps.join(". "));
  }, [plan, i18n.language]);


  if (!plan)
    return <p style={{ textAlign: "center" }}>Loading...</p>;


  /* =============================
  UI
  ============================= */
  return (
    <div className="card">

      <h2>🚨 {t("emergency")}</h2>

      <h3>{t("risk")} : {plan.level}</h3>

      <div style={{ margin: "15px 0" }}>
        {plan.steps.map((s, i) => (
          <p key={i}>• {s}</p>
        ))}
      </div>


      {/* ACTIONS */}
      <button className="btn-danger" onClick={callContact}>
        {t("call")}
      </button>

      <button className="btn-primary" onClick={shareLocation}>
        {t("share")}
      </button>


      {/* 🔥 EMERGENCY TYPE BUTTONS */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => sendIncident("unconscious")}>Unconscious</button>
        <button onClick={() => sendIncident("seizure")}>Seizure</button>
        <button onClick={() => sendIncident("accident")}>Accident</button>
      </div>


      {/* LANGUAGE */}
      <div style={{ marginTop: 12 }}>
        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
        <button onClick={() => i18n.changeLanguage("hi")} style={{ marginLeft: 8 }}>
          हिंदी
        </button>
      </div>

    </div>
  );
}