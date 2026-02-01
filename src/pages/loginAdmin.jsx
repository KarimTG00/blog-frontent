import { useContext } from "react";
import { AppContext } from "../components/context";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  //   const { isDesktop, isTablette, isPhone } = useContext(AppContext);
  const navigate = useNavigate();

  async function connectAdmin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:4000/admin", {
        method: "post",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        if (res.status === 500) {
          const data = await res.json();
          console.log(data);
          return;
        } else if (res.status === 501) {
          const data = await res.json();
          console.log(data);
          return;
        } else {
          const data = await res.text();
          console.log(data);
          return;
        }
      }

      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log("erreur", error);
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
              className="bg-green-600 rounded-xl p-2 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="entrer le password"
              className="bg-green-600 rounded-xl p-2 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-green-700 text-xl font-bold  p-2 rounded-xl cursor-pointer"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
