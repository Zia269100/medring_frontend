import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function OwnerDashboard() {

  const { token } = useParams();

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    conditions: "",
    allergies: "",
    medications: "",
    notes: ""
  });

  /* =========================
  LOAD USER
  ========================= */

  useEffect(() => {
    async function load() {
      const res = await api.get(`/ring/${token}`);
      setUser(res.data.user);
    }
    load();
  }, [token]);

  /* =========================
  SAVE MEDICAL
  ========================= */

  const save = async () => {

    await api.post("/medical/update", {
      userId: user._id,
      conditions: form.conditions.split(","),
      allergies: form.allergies.split(","),
      medications: form.medications.split(","),
      notes: form.notes
    });

    alert("Medical info saved ✅");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card">

      <h2>Owner Dashboard</h2>
      <p><b>{user.name}</b></p>

      <input
        placeholder="Conditions (diabetes, epilepsy)"
        onChange={(e) =>
          setForm({ ...form, conditions: e.target.value })
        }
      />

      <input
        placeholder="Allergies (milk, penicillin)"
        onChange={(e) =>
          setForm({ ...form, allergies: e.target.value })
        }
      />

      <input
        placeholder="Medications"
        onChange={(e) =>
          setForm({ ...form, medications: e.target.value })
        }
      />

      <textarea
        placeholder="Extra notes"
        onChange={(e) =>
          setForm({ ...form, notes: e.target.value })
        }
      />

      <button onClick={save}>Save Medical Info</button>

    </div>
  );
}