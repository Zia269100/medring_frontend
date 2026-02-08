import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function RingHandler() {
  const { token } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    async function check() {
      try {
        const res = await api.get(`/ring/${token}`);

        if (res.data.newUser) {
          nav("/register");
        } else {
          nav(`/emergency/${token}`); // ✅ pass token
        }

      } catch (err) {
        console.error(err);
        nav("/register"); // fallback safe
      }
    }

    if (token) check();

  }, [token]);

  return <p>Checking ring...</p>;
}