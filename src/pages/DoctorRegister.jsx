import { useState } from "react";
import api from "../services/api";

export default function DoctorRegister() {
const [form, setForm] = useState({});
const [file, setFile] = useState(null);

const submit = async () => {
const fd = new FormData();

```
Object.keys(form).forEach(k => fd.append(k, form[k]));
fd.append("proof", file);

await api.post("/doctor/register", fd);

alert("Submitted for verification. Wait for admin approval.");
```

};

return ( <div className="card"> <h2>Doctor Registration</h2>

```
  <input placeholder="Name"
    onChange={e=>setForm({...form,name:e.target.value})}/>

  <input placeholder="Email"
    onChange={e=>setForm({...form,email:e.target.value})}/>

  <input placeholder="Password" type="password"
    onChange={e=>setForm({...form,password:e.target.value})}/>

  <input placeholder="Hospital"
    onChange={e=>setForm({...form,hospital:e.target.value})}/>

  <input placeholder="License Number"
    onChange={e=>setForm({...form,licenseNumber:e.target.value})}/>

  <input type="file"
    onChange={e=>setFile(e.target.files[0])}/>

  <button onClick={submit}>Submit</button>
</div>
```

);
}
