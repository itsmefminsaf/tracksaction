"use client";

import { useEffect, useState } from "react";

const Root = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
    } else {
      fetch("/api/auth/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.uid) {
            setLoading(false);
          }
          setUser(true);
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : user ? (
        <h1>App</h1>
      ) : (
        <h1>Landing Page</h1>
      )}
    </>
  );
};

export default Root;
