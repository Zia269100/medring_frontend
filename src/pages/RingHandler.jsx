import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function RingHandler() {

  const { token } = useParams();
  const nav = useNavigate();

  useEffect(() => {

    async function check() {

      try {

        /* =============================
        LOCAL ROLE CHECK (FAST)
        ============================= */

        const ownerToken = localStorage.getItem("ownerToken");
        const doctorToken = localStorage.getItem("doctorToken");

        // 🔥 OWNER
        if (ownerToken === token) {
          nav(`/owner/${token}`);
          return;
        }

        // 🔥 DOCTOR
        if (doctorToken) {
          nav(`/doctor?token=${token}`);
          return;
        }


        /* =============================
        SERVER CHECK
        ============================= */

        const res = await api.get(`/ring/${token}`);

        // new ring → register
        if (res?.data?.newUser) {
          nav("/register");
          return;
        }

        // default → emergency
        nav(`/emergency/${token}`);

      } catch (err) {

        console.error("RingHandler error:", err);

        // safe fallback
        nav(`/emergency/${token}`);
      }
    }

    if (token) check();

  }, [token, nav]);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      Checking ring...
    </div>
  );
}