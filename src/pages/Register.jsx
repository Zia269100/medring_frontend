import React from "react";
import { useState } from "react";
import api from "../services/api";

export default function Register() {

const [form, setForm] = useState({
token: "",
name: "",
age: "",
bloodGroup: "",
emergencyContact: ""
});

const submit = async () => {
await api.post("/register-ring", form);
alert("Registered successfully");
};

return ( <div className="card">


  <h2>Register Ring</h2>

  <input
    placeholder="Ring Token"
    onChange={(e) =>
      setForm({ ...form, token: e.target.value })
    }
  />

  <input
    placeholder="Name"
    onChange={(e) =>
      setForm({ ...form, name: e.target.value })
    }
  />

  <input
    placeholder="Age"
    onChange={(e) =>
      setForm({ ...form, age: e.target.value })
    }
  />

  <input
    placeholder="Blood Group"
    onChange={(e) =>
      setForm({ ...form, bloodGroup: e.target.value })
    }
  />

  <input
    placeholder="Emergency Contact"
    onChange={(e) =>
      setForm({ ...form, emergencyContact: e.target.value })
    }
  />

  <button onClick={submit}>Register</button>

</div>


);
}
