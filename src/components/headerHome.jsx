import { Search, Menu } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "./context";
import { useNavigate } from "react-router-dom";
import ModalMenu from "./menu";
export default function HeaderHome() {
  const { isDesktop, isTablette, isPhone, menuTrue, setMenuTrue } =
    useContext(AppContext);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  return (
    <header className=" bg-black  top-0">
      <div className="p-2 space-y-3 text-gray-300 ">
        {isSearch && (
          <form action="">
            <div className="w-75 flex text-black bg-white rounded-lg mx-auto">
              <input
                type="text"
                name="search"
                placeholder="entrer la recherche"
                className=" flex-1 text-black p-1 focus:outline-none"
              />
              <button
                className="text-white bg-black m-1 px-1 rounded-lg"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        )}
        <div
          className={`${isSearch ? "hidden" : "flex justify-between  items-center"}`}
        >
          <form action="" className="lg:flex hidden">
            <div className="w-75 flex text-black bg-white rounded-lg mx-auto">
              <input
                type="text"
                name="search"
                placeholder="entrer la recherche"
                className=" flex-1 text-black p-1 focus:outline-none"
              />
              <button
                className="text-white bg-black m-1 px-1 rounded-lg"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
          <div>
            <h1 className="text-3xl font-bold text-center lg:mr-60 lg:text-4xl">
              CrypToBlog
            </h1>
          </div>

          <div className="flex gap-4">
            <div>
              <Search
                className="cursor-pointer"
                onClick={() => setIsSearch(true)}
              />
            </div>
            <Menu
              onClick={() => setMenuTrue(!menuTrue)}
              className="cursor-pointer"
            />
            {menuTrue && <ModalMenu />}
          </div>
        </div>
        <div className="text-center space-x-3 text-normal text-green-500 font-bold underline ">
          <span className="cursor-pointer">Cryptomonaies</span>
          <span className="cursor-pointer">Nft</span>
          <span className="cursor-pointer">BlockChain</span>
        </div>
      </div>
    </header>
  );
}
