import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import localforage from "localforage";

export default function EmergencyView() {

const { token } = useParams();
const { t, i18n } = useTranslation();

const [situation, setSituation] = useState(null);

/* =============================
FUNCTIONS
============================= */

const speak = (text) => {
const msg = new SpeechSynthesisUtterance(text);
msg.rate = 0.9;
msg.lang = i18n.language === "hi" ? "hi-IN" : "en-US";
window.speechSynthesis.cancel();
window.speechSynthesis.speak(msg);
};

const shareLocation = () => {
navigator.geolocation.getCurrentPosition((pos) => {
const { latitude, longitude } = pos.coords;
const mapUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
window.open(mapUrl, "_blank");
});
};

const callContact = () => {
window.location.href = "tel:9876543210";
};

/* =============================
FETCH PLAN (ONLINE + OFFLINE)
============================= */

useEffect(() => {


async function load() {
  try {
    // Try server
    const res = await api.get(`/ring/${token}`);

    const newPlan = res.data.plan;

    setPlan(newPlan);

    // Save offline
    await localforage.setItem("lastPlan", newPlan);

  } catch {

    // Offline fallback
    const cached = await localforage.getItem("lastPlan");

    if (cached) setPlan(cached);
  }
}

load();


}, [token]);

/* =============================
VOICE AUTO SPEAK
============================= */

useEffect(() => {
if (plan) {
speak(plan.steps.join(". "));
}
}, [plan, i18n.language]);

/* =============================
UI
============================= */

if (!plan) return <p style={{ textAlign: "center" }}>{t("loading") || "Loading..."}</p>;

return ( <div className="card">


  <h2>🚨 {t("emergency")}</h2>

  <h3>{t("risk")} : {plan.level}</h3>

  <div style={{ margin: "15px 0" }}>
    {plan.steps.map((s, i) => (
      <p key={i}>• {s}</p>
    ))}
  </div>


  {/* ACTION BUTTONS */}

  <button className="btn-danger" onClick={callContact}>
    {t("call")}
  </button>

  <button className="btn-primary" onClick={shareLocation}>
    {t("share")}
  </button>


  {/* LANGUAGE SWITCH */}

  <div style={{ marginTop: 12, textAlign: "center" }}>
    <button onClick={() => i18n.changeLanguage("en")}>EN</button>
    <button onClick={() => i18n.changeLanguage("hi")} style={{ marginLeft: 8 }}>हिंदी</button>
  </div>

</div>


);
}
