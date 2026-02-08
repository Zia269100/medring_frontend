import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function DoctorLogin() {

const nav = useNavigate();
const [form, setForm] = useState({
email: "",
password: ""
});

const login = async () => {
const res = await api.post("/doctor/login", form);


localStorage.setItem("doctorToken", res.data.token);

nav("/doctor");


};

return ( <div className="card"> <h2>Doctor Login</h2>


  <input
    placeholder="Email"
    onChange={(e) =>
      setForm({ ...form, email: e.target.value })
    }
  />

  <input
    type="password"
    placeholder="Password"
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
  />

  <button onClick={login}>Login</button>
</div>


);
}
