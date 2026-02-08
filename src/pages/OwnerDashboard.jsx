import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function OwnerDashboard() {

const { token } = useParams();

const [user, setUser] = useState(null);
const [medical, setMedical] = useState({
conditions: "",
allergies: "",
medications: "",
notes: ""
});

useEffect(() => {
async function load() {
const res = await api.get(`/ring/${token}`);

```
  setUser(res.data.user);

  if (res.data.medical) {
    setMedical({
      conditions: res.data.medical.conditions.join(","),
      allergies: res.data.medical.allergies.join(","),
      medications: res.data.medical.medications.join(","),
      notes: res.data.medical.notes || ""
    });
  }
}

load();
```

}, [token]);

const save = async () => {
await api.post("/medical/update", {
userId: user._id,
conditions: medical.conditions.split(","),
allergies: medical.allergies.split(","),
medications: medical.medications.split(","),
notes: medical.notes
});

```
alert("Saved ✅");
```

};

if (!user) return <p>Loading...</p>;

return ( <div className="card"> <h2>{user.name}'s Medical Info</h2>


  <textarea placeholder="Conditions"
    value={medical.conditions}
    onChange={e=>setMedical({...medical,conditions:e.target.value})} />

  <textarea placeholder="Allergies"
    value={medical.allergies}
    onChange={e=>setMedical({...medical,allergies:e.target.value})} />

  <textarea placeholder="Medications"
    value={medical.medications}
    onChange={e=>setMedical({...medical,medications:e.target.value})} />

  <textarea placeholder="Notes"
    value={medical.notes}
    onChange={e=>setMedical({...medical,notes:e.target.value})} />

  <button onClick={save}>Save</button>
</div>


);
}
