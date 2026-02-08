import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

/* pages */
import Home from "./pages/Home";
import Register from "./pages/Register";
import RingHandler from "./pages/RingHandler";
import EmergencyView from "./pages/EmergencyView";
import OwnerDashboard from "./pages/OwnerDashboard";

import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorDashboard from "./pages/DoctorDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminAnalytics from "./pages/AdminAnalytics";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* ================= HOME ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />


        {/* ================= RING FLOW ================= */}
        {/* tap ring -> handler -> redirect */}
        <Route path="/r/:token" element={<RingHandler />} />

        {/* emergency view */}
        <Route path="/emergency/:token" element={<EmergencyView />} />

        {/* owner dashboard */}
        <Route path="/owner/:token" element={<OwnerDashboard />} />


        {/* ================= DOCTOR ================= */}
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor" element={<DoctorDashboard />} />


        {/* ================= ADMIN ================= */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/analytics" element={<AdminAnalytics />} />


      </Routes>
    </BrowserRouter>
  );
}