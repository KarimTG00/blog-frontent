import { useState, useEffect } from "react";

function useAuthorization(endpoint, method) {
  const [authorized, setAuthorized] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    async function authentification() {
      try {
        setLoadingAuth(true);

        if (!accessToken) {
          setAuthorized(false);
          return;
        }

        const res = await fetch(`${API_URL}/${endpoint}`, {
          method: `${method}`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          setAuthorized(false);
          if (res.status === 401) {
            await res.json();

            return;
          } else {
            const data = await res.text();
            console.log("error : ", data);
            return;
          }
        }

        await res.json();
        setAuthorized(true);
      } catch (err) {
        console.error("Une erreur :", err.message);
        setAuthorized(false);
      } finally {
        setLoadingAuth(false);
      }
    }
    authentification();
  }, [endpoint, accessToken]);
  return { authorized, loadingAuth };
}

export default useAuthorization;
