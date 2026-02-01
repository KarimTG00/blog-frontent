import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./context";

export default function ModalMenu() {
  const navigate = useNavigate();
  const { setMenuTrue } = useContext(AppContext);
  return (
    <div className="relative">
      <div className="fixed inset-0" onClick={() => setMenuTrue(false)}></div>
      <div className="absolute top-5 right-5 bg-green-800 text-black rounded-xl">
        <div className=" flex flex-col gap-4 p-5">
          <button
            className="py-1 px-4 bg-black rounded-xl text-lg text-white"
            onClick={() => navigate("/inscription")}
          >
            NewsLetter
          </button>
        </div>
      </div>
    </div>
  );
}
