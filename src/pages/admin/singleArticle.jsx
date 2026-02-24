import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../components/context";
import Tiptap from "../../components/admin/Titap";

import Loading from "../../components/loading";
import { Link } from "react-router-dom";

export default function SingleArticles() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const { editor, authorized, loading } = useContext(AppContext);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getArticle() {
      try {
        const res = await fetch(`${API_URL}/article/${id}`, {
          method: "get",
          headers: { "Content-type": "application/json" },
        });
        if (!res.ok) {
          const data = await res.text();
          console.log(data);
          return;
        }
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.log(error);
      }
    }
    getArticle();
  }, [id]);

  // Injecter le contenu dans l'éditeur Tiptap quand l'article est chargé
  useEffect(() => {
    if (editor && article && Array.isArray(article.content)) {
      editor.commands.setContent({ type: "doc", content: article.content });
    }
  }, [editor, article]);

  if (!article) {
    return (
      <div className="flex-1 flex items-center justify-center h-full w-full">
        <span className="flex flex-col items-center justify-center">
          <svg
            className="animate-spin h-10 w-10 mb-4 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="60 40"
              strokeLinecap="round"
              className="opacity-70"
            />
          </svg>
          <span className="sm:text-xl text-lg">chargement de l'article...</span>
        </span>
      </div>
    );
  }

  async function handleUpdateArticle(e) {
    e.preventDefault();
    setLoadingUpdate(true);
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const json = editor.getJSON();
    const objet = {
      json,
      values,
    };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/updateArticle/${id}`,
        {
          method: "put",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(objet),
        },
      );
      if (!res.ok) {
        const data = await res.text();
        console.log(data);
        setLoadingUpdate(false);
        setError(true);
        return;
      }
      await res.json();
      console.log("Article mis à jour:");
    } catch (error) {
      console.log("Erreur lors de la mise à jour de l'article:", error);
      setError(true);
    } finally {
      setLoadingUpdate(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!authorized && !loading) {
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
    <div className="m-2 p-2 sm:m-4 lg:max-w-5xl lg:mx-auto">
      <div>
        <form
          action=""
          className="space-y-2 sm:space-y-4"
          onSubmit={handleUpdateArticle}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Modifier l'article 📃
            </h1>
          </div>

          <div className="sm:w-full flex flex-col">
            <label htmlFor="title" className="sm:text-lg  ">
              Titre :
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border p-1 border-gray-400 rounded-lg bg-slate-100 focus:outline-none font-bold"
              placeholder="le titre..."
              defaultValue={article?.values?.title || article?.title || ""}
            />
          </div>

          <div className="space-y-4">
            <div className={``}>
              <Tiptap />
            </div>

            <div className="space-y-4 flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="auteur">Auteur :</label>
                <input
                  type="text"
                  placeholder="nom de l'auteur"
                  name="auteur"
                  id="auteur"
                  className="border p-1 rounded-lg border-gray-500 w-80 text-lg focus:outline-none"
                  defaultValue={
                    article?.values?.auteur || article?.auteur || ""
                  }
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="durer" className="sm:text-lg ">
                  se texte dure combien de temps :
                </label>
                <div className="flex border w-fit rounded-lg px-2 py-1 border-gray-400">
                  <input
                    type="text"
                    name="durer"
                    id="durer"
                    placeholder="durer.."
                    className="w-20 focus:outline-none"
                    required
                    defaultValue={
                      article?.values?.durer || article?.durer || ""
                    }
                  />
                  <span className="text-gray-600">min</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              className="bg-green-800 py-2 text-xl px-5 rounded-xl text-white flex items-center justify-center md:w-70 "
              type="submit"
              disabled={loading}
              onClick={() => {
                (setActive(true),
                  setTimeout(() => {
                    setActive(false);
                  }, 2000));
              }}
            >
              {loadingUpdate ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-0"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <circle
                      className="opacity-75"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="60"
                      strokeDashoffset="20"
                    ></circle>
                  </svg>
                  Mise à jour...
                </span>
              ) : (
                "Mettre à jour l'article"
              )}
            </button>
            {error && active ? (
              <div className="text-red-600 ml-4 self-center">
                Une erreur est survenue. Veuillez réessayer.
              </div>
            ) : !error && !loadingUpdate && active ? (
              <div className="text-green-600 ml-4 self-center w-full block text-right">
                <span className="font-bold">Modifier ✅</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
