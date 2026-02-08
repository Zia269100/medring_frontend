import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminPanel() {

const [docs, setDocs] = useState([]);

const load = async () => {
const res = await api.get("/doctor/pending");
setDocs(res.data);
};

const approve = async (id) => {
await api.post(`/doctor/verify/${id}`);
load();
};

useEffect(() => {
load();
}, []);

return ( <div className="card"> <h2>Admin Verification</h2>


  {docs.map(d => (
    <div key={d._id} style={{marginBottom:10}}>
      <p>{d.name} - {d.hospital}</p>
      <a href={`http://localhost:5000/${d.proofFile}`} target="_blank">View Proof</a>
      <button onClick={()=>approve(d._id)}>Approve</button>
    </div>
  ))}
</div>


);
}
