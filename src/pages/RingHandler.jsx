import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function RingHandler() {
  const { token } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    async function check() {
      const res = await api.get(`/ring/${token}`);

      if (res.data.newUser) {
        nav("/register");
      } else {
        nav("/emergency"); // default common view
      }
    }

    check();
  }, []);

  return <p>Loading...</p>;
}