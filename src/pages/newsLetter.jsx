import { useContext } from "react";
import { AppContext } from "../components/context";

export default function NewsLetter() {
  const { isDesktop, isTablette, isPhone } = useContext(AppContext);

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
            <form action="" className="flex flex-col">
              <span className="text-red-500 ">*</span>
              <input
                type="text"
                name="email"
                placeholder="adresse email"
                className="border-2 w-full p-2 text-xl border-green-700 focus:outline-none rounded-sm"
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
                className="mt-8 bg-black text-white p-1 text-2xl m-4"
              >
                Inscription
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
