import { useContext } from "react";
import { AppContext } from "../../components/context";
import Tiptap from "../../components/admin/Titap";

export default function NewArticles() {
  const { editor, contentJSON } = useContext(AppContext);
  // function pour envoyer l'article au backend

  async function handleSubmit(e) {
    e.preventDefault();

    if (!editor) {
      return null;
    }
    const json = editor.getJSON(); // on recupere le contenu de l'éditeur au format JSON
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const objet = {
      json,
      values,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/new`, {
        method: "post",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify(objet),
      });
      if (!res.ok) {
        const data = await res.text();
        console.log(data);
        return;
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(contentJSON);
  return (
    <div className="m-2 p-2 sm:m-4 lg:max-w-5xl lg:mx-auto">
      <div className="">
        {" "}
        <form
          action=""
          className="space-y-2 sm:space-y-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Créer un nouvel article 📃
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
                  />
                  <span className="text-gray-600">min</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="  bg-green-600 py-2 text-xl  px-5 rounded-xl text-white "
              type="submit"
            >
              Publier l'article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
