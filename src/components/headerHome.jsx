import { Search, Menu } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "./context";
import ModalMenu from "./menu";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
export default function HeaderHome() {
  const { menuTrue, setMenuTrue } = useContext(AppContext);
  const [isSearch, setIsSearch] = useState(false);
  const [resultSearch, setResultSearch] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  async function search(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const query = formData.get("search");
      const response = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();

      console.log(data);
      setResultSearch(data);
    } catch (error) {
      console.log("une erreur lors de la recherche d'articles", error);
    }
  }

  return (
    <header className=" bg-black  top-0">
      <div className="p-2 space-y-3 text-gray-300 ">
        {isSearch && (
          <div className="flex  items-center justify-center z-50">
            <div className="relative w-full flex flex-col justify-center items-center">
              <div className="flex justify-center items-center gap-4  ">
                <form action="" onSubmit={(e) => search(e)}>
                  <div className="w-75 sm:w-100 flex text-black bg-white rounded-lg mx-auto">
                    <input
                      type="text"
                      name="search"
                      placeholder="entrer la recherche"
                      className=" flex-1 text-black p-1 focus:outline-none"
                    />
                    <button
                      className="text-white bg-black m-1 px-1 rounded-lg cursor-pointer"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </form>
                <div>
                  <X
                    className="cursor-pointer bg-white text-black rounded-full p-1"
                    onClick={() => setIsSearch(false)}
                  />
                </div>
              </div>

              {resultSearch && (
                <div className="w-full flex justify-center">
                  <div
                    className="fixed inset-0"
                    onClick={() => setIsSearch(false)}
                  ></div>
                  <ul className="bg-gray-100 absolute sm:w-xl flex flex-col justify-center border rounded-lg items-center mt-3">
                    {resultSearch.map((el, index) => (
                      <Link to={`/single/${el._id}`}>
                        {" "}
                        <li
                          key={index}
                          className="text-black sm:w-xl cursor-pointer border-b border-gray-300 px-2 hover:text-green-900"
                        >
                          {el.title}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={`${isSearch ? "hidden" : "flex justify-between  items-center sm:mx-2"}`}
        >
          <div>
            <h1 className="text-3xl font-bold text-center lg:mr-60 lg:text-4xl">
              CrypToBlog
            </h1>
          </div>

          <div className="flex gap-4 justify-center items-center">
            <div className=" flex">
              <Search
                className="cursor-pointer"
                onClick={() => (setIsSearch(true), setResultSearch(null))}
              />
            </div>
            <div className="hidden sm:flex ">
              <Link to={"/inscription"}>
                <button className="py-1 px-4 bg-white rounded-xl text-lg text-black cursor-pointer">
                  NewsLetter
                </button>
              </Link>
            </div>
            <div className="sm:hidden flex">
              <Menu
                onClick={() => setMenuTrue(!menuTrue)}
                className="cursor-pointer sm:mr-10"
              />
              {menuTrue && <ModalMenu />}
            </div>
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
