import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function DoctorLogin() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  /* =========================
  LOGIN FUNCTION
  ========================= */
  const login = async (e) => {
    e.preventDefault(); // 🔥 very important

    try {
      setLoading(true);

      const res = await api.post("/doctor/login", form);

      // save token
      localStorage.setItem("doctorToken", res.data.token);

      alert("Login successful ✅");

      nav("/doctor"); // go dashboard

    } catch (err) {
      console.error(err);
      alert("Login failed ❌ Check credentials");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
  UI
  ========================= */
  return (
    <div className="card">

      <h2>Doctor Login</h2>

      <form onSubmit={login}>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}