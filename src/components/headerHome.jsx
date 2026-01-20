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
      {isDesktop && (
        <div>
          <div className="p-3 flex justify-between items-center mb-4">
            <div className=" gap-2 bg-white w-60 justify-center items-center rounded-2xl flex">
              <input
                type="text"
                placeholder="Rechercher..."
                className=" p-2 rounded-2xl focus:outline-none"
              />
              <Search className="text-green-800" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">CrypToBlog</h1>
            </div>
            <div className=" flex gap-4 ">
              <button
                className="py-1 px-4 bg-white rounded-2xl text-lg"
                onClick={() => navigate("/inscription")}
              >
                NewsLetter
              </button>
              <button className="py-1 px-4 bg- rounded-2xl text-lg bg-emerald-400 text-white font-semibold">
                Patreon
              </button>
            </div>
          </div>
          <div className="text-center space-x-3 text-lg font-bold text-green-500 underline ">
            <span className="cursor-pointer">Cryptomonaies</span>
            <span className="cursor-pointer">Nft</span>
            <span className="cursor-pointer">BlockChain</span>
          </div>
        </div>
      )}{" "}
      {isTablette && (
        <div className="p-2 space-y-3 text-gray-300 ">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold ">CrypToBlog</h1>
            </div>

            {isSearch && (
              <form action="">
                <div className="w-80 bg-white rounded-lg flex">
                  <input
                    type="text"
                    name="search"
                    placeholder="entrer la recherche"
                    className=" focus:outline-none w-full rounded-lg text-black pl-1"
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

            <div className="flex justify-center items-center  gap-3">
              <div
                className={`${isSearch ? "hidden" : "flex justify-between items-center"}`}
              >
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
          <div className="text-center space-x-3 text-normal text-green-500 font-bold underline">
            <span className="cursor-pointer">Cryptomonaies</span>
            <span className="cursor-pointer">Nft</span>
            <span className="cursor-pointer">BlockChain</span>
          </div>
        </div>
      )}
      {isPhone && (
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
            <div>
              <h1 className="text-3xl font-bold ">CrypToBlog</h1>
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
          <div className="text-center space-x-3 text-normal text-green-500 font-bold underline">
            <span className="cursor-pointer">Cryptomonaies</span>
            <span className="cursor-pointer">Nft</span>
            <span className="cursor-pointer">BlockChain</span>
          </div>
        </div>
      )}
    </header>
  );
}
