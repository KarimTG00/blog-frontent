import { User } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context";

export default function HeaderAdmin() {
  const { isDesktop, isTablette } = useContext(AppContext);
  return (
    <div className="bg-black">
      <header
        className={`${isDesktop && "flex justify-between max-w-6xl mx-auto p-3"} ${isTablette && "flex justify-between p-3"} flex justify-between items-center p-2`}
      >
        <div>
          <h1
            className={` ${isDesktop ? "text-4xl text-green-500 font-bold" : "text-3xl font-bold text-green-500 sm:text-4xl"}`}
          >
            CryptoBlog
          </h1>
        </div>
        <div className="flex items-center text-white gap-2 mx-3 cursor-pointer">
          <div className="text-xl  bg-green-700/50 p-2 rounded-xl cursor-pointer">
            <User className="text-white font-bold" />
          </div>
          {isTablette || (isDesktop && <span className="text-xl">Admin</span>)}
        </div>
      </header>
    </div>
  );
}
