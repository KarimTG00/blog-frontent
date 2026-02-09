import errorImage from "../assets/error2.png";

export default function ErrorArticle() {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 sm:space-y-4  w-full">
      <div className="">
        <img
          src={errorImage}
          alt="Erreur de chargement d'article"
          className="size-40"
        />
      </div>
      <span className="text-lg sm:text-xl text-center sm:px-0 px-4 sm:w-100">
        Désole, une erreur est survenue lors du chargement des l'articles!
      </span>
    </div>
  );
}
