import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/context";
import { Link } from "react-router-dom";
import { Delete } from "lucide-react";
import Loading from "../../components/loading";
export default function Articles() {
  const { DeleteArticle, extractText } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [adminAllArticles, setAdminAllArticles] = useState();
  const { authorized, loadingAuth } = useContext(AppContext);
  useEffect(() => {
    async function getDoc() {
      try {
        const res = await fetch(`${API_URL}/AdminAllarticles`, {
          method: "get",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) {
          if (res.status === 500) {
            const data = await res.json();
            console.log("une erreur : ", data);
            return;
          }
          const data = await res.text();
          console.log(data);
          return;
        }

        const data = await res.json(); // tableau de tous les articles

        // on formate le contenu tiptap en contenu utilisable
        data.forEach((el) => {
          const parsed = [];
          el.content.forEach(
            (child) => {
              extractText(child, parsed);
            },
            (el.content = parsed),
          );
        });
        setAdminAllArticles(data);
      } catch (error) {
        console.log("une erreur lors de la recuperation des articles :", error);
        return `voici l'erreur: ${error}`;
      }
    }
    getDoc();
  }, []);

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!authorized && !loadingAuth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden gap-5">
        <h1 className="text-xl">
          Votre session a expirée, veuillez vous reconnecter
        </h1>
        <Link to="/admin">
          <button className="bg-green-700 text-white p-2 rounded-lg text-lg font-semibold cursor-pointer">
            Reconnection
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="sm:space-y-4sm:m-5 m-3 sm:max-w-4xl mx-auto pt-2 space-y-4">
      <h2 className="sm:text-2xl text-2xl font-semibold">Tous les articles</h2>
      <ul className="bg-gray-100 rounded-xl p-2 md:w-3xl md:p-4 flex flex-col gap-2 min-h-full justify-between">
        <div className="flex flex-col gap-2">
          {adminAllArticles &&
            adminAllArticles.slice(0, 10).map((el, index) => (
              <Link to={`/admin/dashboard/articles/${el._id}`}>
                <li
                  key={index}
                  className="flex justify-between pb-4 border border-gray-400 p-2 rounded-lg cursor-pointer hover:scale-101 duration-100"
                >
                  <div>
                    <h3 className="w-70 md:w-150 overflow-auto text-lg text-gray-900">
                      {el.title}
                    </h3>
                    <div className="space-x-4">
                      <span className="text-md text-green-600">
                        {new Date(el.createdAt).toLocaleDateString()}
                      </span>
                      <span>0 vue(s)</span>
                    </div>
                  </div>

                  <div className="flex items-end ">
                    <Delete
                      className="cursor-pointer"
                      onClick={() => DeleteArticle(el._id)}
                    />
                  </div>
                </li>
              </Link>
            ))}
        </div>
      </ul>
    </div>
  );
}
