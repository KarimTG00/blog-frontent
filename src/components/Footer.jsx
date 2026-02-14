import { Facebook, Instagram, Twitter, Send, Github } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
      setError(false);
    } catch (error) {
      setError(true);
      console.log("une erreur ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-black text-white pt-5 sm:pt-12 border-t-4 border-green-500 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
        {/* Section Logo et Description */}
        <div className="mb-4 md:mb-8">
          <h3 className="text-green-500 text-2xl font-bold mb-4 uppercase tracking-wide">
            CryptoBlog
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm max-w-xs">
            Votre source d'information sur la cryptomonnaie, la blockchain et
            les technologies décentralisées.
          </p>
        </div>

        {/* Réseaux sociaux */}
        <div className="">
          <div className="flex space-x-4 mb-6 m-4 gap-5 justify-center sm:text-lg">
            <a
              href="https://twitter.com"
              className="text-gray-300 hover:text-green-500 transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter />
            </a>
            <a
              href="https://telegram.org"
              className="text-gray-300 hover:text-green-500 transition-colors duration-300"
              aria-label="Telegram"
            >
              <Send />
            </a>
            <a
              href="https://github.com"
              className="text-gray-300 hover:text-green-500 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github />
            </a>
            <a
              href="https://discord.com"
              className="text-gray-300 hover:text-green-500 transition-colors duration-300"
              aria-label="Discord"
            >
              <Instagram />
            </a>
          </div>
          <div></div>
        </div>

        {/* Section Newsletter et Social */}
        <div className="mb-8">
          <h4 className="text-white text-xl font-semibold mb-4 pb-2 border-b-2 border-green-500 inline-block">
            Connectez-vous
          </h4>

          {/* Newsletter */}
          <p className="text-gray-300 mb-3 text-sm">
            Abonnez-vous à notre newsletter
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => hanldeSubmit(e)}
          >
            <input
              type="email"
              placeholder="Votre email"
              className="grow px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-400 transition-colors duration-300 whitespace-nowrap text-sm"
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
                <span className="">{submit ? "👍" : "S'abonner"}</span>
              )}
            </button>
          </form>
          {error && (
            <p className="text-red-500 text-center font-semibold">
              Une erreur est survenue. Veuillez réessayer!
            </p>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 mt-12 py-6 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {currentYear} CryptoBlog. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-sm"
            >
              Politique de confidentialité
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-sm"
            >
              Conditions d'utilisation
            </a>
            <a
              href="/cookies"
              className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-sm"
            >
              Politique des cookies
            </a>
            <a
              href="/disclaimer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm font-medium"
            >
              <i className="fas fa-exclamation-triangle mr-1"></i> Avertissement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
