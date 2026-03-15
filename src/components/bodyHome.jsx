import React, { useContext } from "react";
import { AppContext } from "./context";
import { Link } from "react-router-dom";

import Description from "./admin/description";
import Image from "./admin/Image";
import { getTime } from "./date";
import Loading from "./loading";
import ErrorArticle from "./errorArticle";
import { SpadeIcon } from "lucide-react";
import { getOtherArticles } from "./requetes/api";

export default function BodyHome() {
  const {
    isTablette,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    hasNextPage,
    data,
  } = useContext(AppContext);

  return (
    <>
      <div className="mx-auto p-2 px-4 lg:px-8 flex flex-col">
        <article className={`text-2xl sm:text-3xl font-semibold my-4`}>
          Decouvrez les Dernieres actualitées cryptos
        </article>

        {isFetching && (
          <div className="flex-1 min-w-full justify-center items-center flex ">
            <Loading />
          </div>
        )}
        {status === "error" && (
          <div className="min-w-full items-center flex-1 pb-20 flex">
            <ErrorArticle />
          </div>
        )}
        <div
          className={`${isTablette ? "grid grid-cols-1 w-full gap-4" : "w-full grid grid-cols-1 md:grid-cols-3 gap-3"}`}
        >
          {data?.pages.map((el, index) => (
            <React.Fragment key={index}>
              {el.data.map((article, index2) => (
                <Link to={`/single/${article._id}`} key={index2}>
                  <div className=" shadow-sm  rounded-lg cursor-pointer hover:scale-101 hover:border-2 hover:border-green-700 duration-100">
                    <div className="">
                      <Image el={article} />
                    </div>

                    <div className="p-2">
                      <h1 className="font-bold sm:text-2xl my-2 text-lg">
                        {article.title}
                      </h1>
                      <p className="text-sm text-gray-600">
                        Par {article.auteur} il y a {getTime(article.createdAt)}
                      </p>
                      <div>
                        <Description el={article} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="my-10 text-center">
          <button
            onClick={() => fetchNextPage()}
            // On bloque le bouton si on charge DÉJÀ ou s'il n'y a PLUS RIEN
            disabled={isFetchingNextPage || !hasNextPage}
            className="text-lg sm:text-xl text-green-800 lg:text-2xl"
          >
            {isFetching
              ? ""
              : isFetchingNextPage
                ? "chargement..."
                : hasNextPage
                  ? "charger plus d'article ?"
                  : "Plus d'articles pour le moment !"}
          </button>
        </div>
      </div>
    </>
  );
}
