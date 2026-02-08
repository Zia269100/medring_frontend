import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    token: "",
    name: "",
    age: "",
    bloodGroup: "",
    emergencyContact: ""
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); // ✅ VERY IMPORTANT

    try {
      setLoading(true);

      await api.post("/register-ring", form);

      alert("Registered successfully ✅");

      nav(`/owner/${form.token}`); // auto redirect

    } catch (err) {
      console.error(err);
      alert("Registration failed ❌ Check backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Register Ring</h2>

      <form onSubmit={submit}>

        <input
          placeholder="Ring Token"
          value={form.token}
          onChange={(e) =>
            setForm({ ...form, token: e.target.value })
          }
        />

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Age"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: e.target.value })
          }
        />

        <input
          placeholder="Blood Group"
          value={form.bloodGroup}
          onChange={(e) =>
            setForm({ ...form, bloodGroup: e.target.value })
          }
        />

        <input
          placeholder="Emergency Contact"
          value={form.emergencyContact}
          onChange={(e) =>
            setForm({ ...form, emergencyContact: e.target.value })
          }
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

      </form>
    </div>
  );
}