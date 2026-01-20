import { useContext } from "react";
import { AppContext } from "../components/context";

export default function LoginAdmin() {
  const { isDesktop, isTablette, isPhone } = useContext(AppContext);
  return (
    <div className="mx-auto h-screen ">
      <div className="flex justify-center border items-center h-full">
        <form
          action=""
          className="bg-green-800 text-white p-3 md:w-md w-sm flex flex-col gap-5 sm:rounded-xl rounded-lg"
        >
          <div>
            <h1 className="text-4xl text-center font-bold">Connexion</h1>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email..."
              className="bg-green-600 rounded-xl p-2"
            />
            <input
              type="password"
              name="password"
              placeholder="entrer le password"
              className="bg-green-600 rounded-xl p-2"
            />
          </div>
          <button
            type="button"
            className="bg-white text-green-700 text-2xl font-bold  p-2 rounded-xl "
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
