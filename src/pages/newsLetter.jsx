import { useContext } from "react";
import { AppContext } from "../components/context";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { X } from "lucide-react";

export default function NewsLetter() {
  const { isDesktop, isTablette, isPhone } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  async function hanldeSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      if (!res.ok) {
        setError(true);
        if (res.satus === 500) {
          const data = await res.json();
          console.log(data);
          return;
        }
        const data = await res.text();
        console.log(data);
        return;
      }

      const data = await res.json();
      console.log(data);
      setSubmit(true);
    } catch (error) {
      console.log("une erreur ", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-gray-100 h-full p-1">
      <div
        className={`${isDesktop && "max-w-xl mx-auto mt-3 px-15"} ${isTablette && "max-w-xl mx-auto  mt-3 px-15"} ${isPhone && "max-w-100 mx-auto mt-1"} bg-white p-2 flex flex-col gap-8 pt-10`}
      >
        <div className="space-y-8">
          <p className="text-4xl text-center text-green-800 font-bold">
            CryptoBlog
          </p>
          <h1 className="text-center text-3xl font-bold sm:text-3xl">
            Inscrivez-Vous à Notre Newsletter
          </h1>
        </div>
        <div className="space-y-4">
          <div className="max-w-100 mx-auto">
            <p className="text-xl">
              Restez informé des dernières actualités crypto, des astuces
              exclusives et des analyses tendances !{" "}
              <strong>Directement dans votre boite au lettre.</strong>
              <br /> <br />
            </p>
            <p className="text-xl text-gray-600">
              Inscrivez-vous à notre newsletter et recevez directement dans
              votre boîte mail tout ce qu’il faut savoir pour ne rien manquer du
              monde de la crypto. <br /> <br /> Rejoignez notre communauté dès
              maintenant!
            </p>
          </div>
          <div className="">
            <form
              action=""
              className="flex flex-col"
              onSubmit={(e) => hanldeSubmit(e)}
            >
              <span className="text-red-500 ">*</span>
              <input
                type="text"
                name="email"
                placeholder="adresse email"
                className="border-2 w-full p-2 text-xl border-green-700 focus:outline-none rounded-sm"
                required
              />
              <p className="text-base text-gray-600">
                Veuillez renseignez votre adresse email pour vous inscrire.{" "}
                <br />
                ex: exemple@gmail.com
              </p>
              <div className="space-x-3">
                <input
                  type="radio"
                  name="confirm"
                  id="confirm"
                  className="mt-5"
                  required
                />
                <label htmlFor="confirm" className="text-md text-justify">
                  J'acceptes de recevoir vos e-mails et confirme avoir pris
                  connaissance de votre{" "}
                  <a href="" className="text-blue-600 hover:underline">
                    politque de confidentialité
                  </a>{" "}
                  et mentions légales.{" "}
                </label>
              </div>

              <button
                type="submit"
                className="mt-8 bg-black text-white p-1 text-2xl m-4 sm:w-100 flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-0"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <circle
                        className="opacity-75"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray="60"
                        strokeDashoffset="20"
                      />
                    </svg>
                  </span>
                ) : (
                  <span>Inscription</span>
                )}
              </button>
              {error && (
                <p className="text-red-500 text-center">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      {submit && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
          <div className="space-y-2">
            <div className="flex justify-end">
              <X className="bg-white size-8 p-1 rounded-full text-gray-500" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center text-green-700">
                Inscription réussie !
              </h2>
              <p className="text-gray-700 flex flex-col items-center gap-4">
                <div>
                  <span className="font-bold">Félicitations !</span> Vous êtes
                  maintenant inscrit à notre newsletter.
                </div>

                <Link
                  to="/"
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  <ChevronLeft className="inline " size={16} /> Voir les
                  articles
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
