
import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminAnalytics() {

  const [stats, setStats] = useState({
    users: 0,
    rings: 0,
    incidents: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>

      <h2 style={{ marginBottom: 20 }}>📊 Admin Analytics</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 20
      }}>

        <Card title="Users" value={stats.users} />
        <Card title="Rings" value={stats.rings} />
        <Card title="Incidents" value={stats.incidents} />

      </div>
    </div>
  );
}


function Card({ title, value }) {
  return (
    <div style={{
      background: "#fff",
      padding: 25,
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}