// Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();

  useEffect(() => {
    async function track() {
      const res = await fetch(`${API_URL}/track`, {
        method: "POST",
        body: JSON.stringify({ url: location.pathname }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        console.log(data);
      }
      await res.json();
    }
    track();
  }, [location.pathname]);

  return (
    <>
      <Outlet />
    </>
  );
}
