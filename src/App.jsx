import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import OwnerDashboard from "./pages/OwnerDashboard";
import EmergencyView from "./pages/EmergencyView";
import DoctorDashboard from "./pages/DoctorDashboard";
import RingHandler from "./pages/RingHandler";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorLogin from "./pages/DoctorLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/owner/:token" element={<OwnerDashboard />} />
        <Route path="/emergency" element={<EmergencyView />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/r/:token" element={<RingHandler />} />
        <Route path="/r/:token" element={<EmergencyView />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/analytics" element={<AdminAnalytics />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}