import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../components/context";
import Tiptap from "../../components/admin/Titap";

export default function SingleArticles() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const { editor } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getArticle() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/article/${id}`,
          {
            method: "get",
            headers: { "Content-type": "application/json" },
          },
        );
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
    setLoading(true);
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const json = editor.getJSON();
    const objet = {
      json,
      values,
    };
    try {
      const res = await fetch(`http://localhost:4000/updateArticle/${id}`, {
        method: "put",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(objet),
      });
      if (!res.ok) {
        const data = await res.text();
        console.log(data);
        setLoading(false);
        setError(true);
        return;
      }
      const data = await res.json();
      console.log("Article mis à jour:", data);
    } catch (error) {
      console.log("Erreur lors de la mise à jour de l'article:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
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
          <div className="flex justify-end ">
            <button
              className="bg-green-600 py-2 text-xl px-5 rounded-xl text-white flex items-center justify-center min-w-45 "
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Mise à jour...
                </span>
              ) : (
                "Mettre à jour l'article"
              )}
            </button>
            {error && (
              <div className="text-red-600 ml-4 self-center">
                Une erreur est survenue. Veuillez réessayer.
              </div>
            )}
            {!error && !loading && (
              <div className="text-green-600 ml-4 self-center">
                Article mis à jour avec succès !
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
