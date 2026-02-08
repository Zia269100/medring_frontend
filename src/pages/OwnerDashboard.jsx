import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function OwnerDashboard() {

const { token } = useParams();
const [data, setData] = useState(null);

useEffect(() => {
async function load() {
const res = await api.get(`/ring/${token}`);
setData(res.data);
}

```
load();
```

}, [token]);

if (!data) return <p>Loading...</p>;

return ( <div className="card"> <h2>Owner Dashboard</h2> <pre>{JSON.stringify(data, null, 2)}</pre> </div>
);
}
