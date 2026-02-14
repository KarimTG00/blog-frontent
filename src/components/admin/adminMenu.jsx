import { useContext } from "react";
import { AppContext } from "../context";
import { Delete } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../loading";
import AllUser from "./feedUser";
import { Link } from "react-router-dom";

export default function AdminMenu() {
  const { article, DeleteArticle, extractText } = useContext(AppContext);
  console.log(article);
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const [adminArticle, setAdminArticle] = useState();
  const [dayViews, setDayViews] = useState(0);
  // const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const { authorized, loadingAuth } = useContext(AppContext);

  useEffect(() => {
    async function total() {
      try {
        const res = await fetch(`${API_URL}/getArticles`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) {
          if (res.status === 500) {
            const data = await res.json();
            console.log(data);
          }
          const data = await res.text();
          console.log(data);
        }

        const data = await res.json();
        setTotal(data.total);
      } catch (error) {
        console.log("une erreur ", error);
      }
    }
    total();
  }, []);

  //on recupéres le nombre de vues du jour
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/dayViews`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) {
          if (res.status === 500) {
            const data = await res.json();
            console.log(data);
          }
        }
        const data = await res.json();
        setDayViews(data.length);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getDoc() {
      try {
        const res = await fetch(`${API_URL}/Adminarticles`, {
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
        setAdminArticle(data);
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
    <div>
      <div className="p-5 space-y-10">
        <h1 className="text-3xl font-bold border-b border-gray-300">
          Tableau de Bord
        </h1>
        <ul className="grid grid-cols-subgrid gap-5 sm:flex">
          <li className="bg-gray-300 p-2 rounded-lg flex flex-col justify-center items-center sm:max-h-25 sm:max-w-50">
            <div>
              <span className="text-4xl text-green-500 font-bold">
                {dayViews}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Visites du jour</h2>
            </div>
          </li>
          <li className="bg-gray-300  p-2 rounded-lg flex flex-col justify-center items-center sm:max-h-25 sm:max-w-50">
            <div>
              <span className="font-bold text-4xl">
                {total ? total : "..."}
              </span>
            </div>
            <div className="text-xl font-semibold">Articles Publiés</div>
          </li>
          <li className="bg-gray-300  p-2 rounded-lg flex flex-col justify-center items-center gap-2 sm:max-h-25 sm:max-w-50 max-h-25">
            <div className="overflow-y-scroll">
              <p className="text-md text-center max-w-50">
                ici c'est le brouillon appuler sur continuer pour reprendre
              </p>
            </div>
            <div className="">
              <button className="text-lg  text-white bg-black t p-1 rounded-xl font-semibold flex">
                continuer
              </button>
            </div>
          </li>
        </ul>
        <div className="space-y-4 ">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Utitlisateurs</h2>
              <AllUser />
            </div>

            <ul className="bg-gray-100 rounded-xl p-2 md:p-4 flex flex-col gap-2 min-h-100 max-h-150 overflow-y-scroll justify-between flex-1 ">
              <h2 className="text-2xl font-semibold">Derniers articles</h2>
              <div className="space-y-4">
                {/* {loading && <Loading />} */}
                {adminArticle &&
                  adminArticle.slice(0, 5).map((el, index) => (
                    <li
                      key={index}
                      className="flex pb-4 border border-gray-400 p-2 rounded-lg cursor-pointer hover:scale-101 duration-100 gap-1 relative "
                    >
                      <div
                        className="flex-1"
                        onClick={() =>
                          navigate(`/admin/dashboard/articles/${el._id}`)
                        }
                      >
                        <div className="">
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
                      </div>
                      <div className="flex items-end">
                        <Delete
                          className="cursor-pointer"
                          onClick={() => DeleteArticle(el._id)}
                        />
                      </div>
                    </li>
                  ))}
              </div>

              <div className="text-left flex justify-end gap-3">
                <button
                  className="bg-black p-1 text-lg text-white rounded-lg sm:p-2 cursor-pointer"
                  onClick={() => navigate("/admin/dashboard/articles")}
                >
                  voir tout
                </button>
                <button
                  className="bg-green-700 text-white p-1 rounded-lg text-lg sm:p-2 cursor-pointer"
                  onClick={() => navigate("/admin/dashboard/articles/new")}
                >
                  Ajouter un article
                </button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
