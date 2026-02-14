import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [submit, setSubmit] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  async function connectAdmin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin`, {
        method: "post",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        if (res.status === 500) {
          const data = await res.json();
          setError(true);
          setMsgError(data.msg);
          return;
        } else if (res.status === 501) {
          const data = await res.json();
          setError(true);
          setMsgError(data.msg);
          console.log(data);
          return;
        } else {
          setError(true);
          setMsgError("Une erreur est survenue. Veuillez réessayer.");
          const data = await res.text();
          console.log(data);
          return;
        }
      }

      const data = await res.json();
      setSubmit(true);
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log("erreur", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mx-auto h-screen ">
      <div className="flex justify-center items-center h-full">
        <form
          action=""
          className="bg-green-800 text-white p-3 md:w-md w-sm flex flex-col gap-5 sm:rounded-xl rounded-lg"
          onSubmit={(e) => connectAdmin(e)}
        >
          <div>
            <h1 className="text-3xl text-center font-bold">Connexion</h1>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email..."
              className="bg-green-600 rounded-xl p-2 focus:outline-none "
              required
            />
            <input
              type="password"
              name="password"
              placeholder="entrer le password"
              className="bg-green-600 rounded-xl p-2 focus:outline-none"
              required
            />
            {error && (
              <p className="text-red-500 bg-white w-fit p-2 rounded-lg text-center">
                {msgError || "Une erreur est survenue. Veuillez réessayer."}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-white text-xl font-bold  p-2 rounded-xl cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center text-white">
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    scale="0.8"
                    stroke="white"
                    fill="white"
                    strokeWidth="4"
                  />
                  <circle
                    className="opacity-75"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    fill="green"
                    strokeWidth="4"
                    strokeDasharray="60"
                    strokeDashoffset="40"
                  />
                </svg>
              </span>
            ) : (
              <span className="text-green-700">Connexion</span>
            )}
          </button>

          {submit && (
            <p className="text-green-500 text-center">
              Connexion réussie ! Redirection en cours...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
