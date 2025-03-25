"use client";

import { useEffect, useState } from "react";

const RootPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
    } else {
      fetch("/api/auth/verify-token", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.status === 200) {
          setUser(true);
        }
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

export default RootPage;
