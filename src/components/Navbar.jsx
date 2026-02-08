import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const nav = useNavigate();

  const logoutDoctor = () => {
    localStorage.removeItem("doctorToken");
    nav("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#2f80ed",
      padding: "12px 20px",
      color: "white",
      fontWeight: "bold"
    }}>

      {/* LEFT LOGO */}
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "18px"
        }}
      >
        MedRing ❤️
      </Link>


      {/* RIGHT MENU */}
      <div style={{ display: "flex", gap: "18px", fontWeight: 500 }}>

        <Link style={linkStyle} to="/">Home</Link>

        <Link style={linkStyle} to="/register">Register</Link>

        <Link style={linkStyle} to="/doctor/login">Doctor Login</Link>

        <Link style={linkStyle} to="/admin-login">Admin</Link>

        {/* optional logout */}
        {localStorage.getItem("doctorToken") && (
          <button
            onClick={logoutDoctor}
            style={{
              background: "white",
              color: "#2f80ed",
              border: "none",
              padding: "4px 10px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
};