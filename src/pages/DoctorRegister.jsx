import { useState } from "react";
import api from "../services/api";

export default function DoctorRegister() {

const [form, setForm] = useState({});

const register = async () => {
await api.post("/doctor/register", form);
alert("Registered successfully");
};

return ( <div className="card">


  <h2>Doctor Register</h2>

  <input
    placeholder="Name"
    onChange={(e) =>
      setForm({ ...form, name: e.target.value })
    }
  />

  <input
    placeholder="Email"
    onChange={(e) =>
      setForm({ ...form, email: e.target.value })
    }
  />

  <input
    placeholder="Password"
    type="password"
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
  />

  <button onClick={register}>Register</button>

</div>


);
}
