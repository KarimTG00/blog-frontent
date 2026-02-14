import { useContext } from "react";
import { AppContext } from "./context";
import { Link } from "react-router-dom";

import Description from "./admin/description";
import Image from "./admin/Image";
import { getTime } from "./date";
import Loading from "./loading";
import ErrorArticle from "./errorArticle";

export default function BodyHome() {
  const { isTablette, article, loadingArticles, errorArticles } =
    useContext(AppContext);
  return (
    <>
      <div className="mx-auto p-2 px-4 lg:px-8 flex flex-col">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-semibold my-4`}>
            Decouvrez les Dernieres actualitées cryptos
          </h1>
        </div>
        {loadingArticles && (
          <div className="flex-1 min-w-full justify-center items-center flex ">
            <Loading />
          </div>
        )}
        {errorArticles && (
          <div className="min-w-full items-center flex-1 pb-20 flex">
            <ErrorArticle />
          </div>
        )}
        <div
          className={`${isTablette ? "grid grid-cols-1 w-full gap-4" : "w-full grid grid-cols-1 md:grid-cols-3 gap-3"}`}
        >
          {article &&
            article?.map((el, index) => (
              <Link to={`/single/${el._id}`} key={index}>
                <div className=" shadow-sm  rounded-lg cursor-pointer hover:scale-101 hover:border-2 hover:border-green-700 duration-100">
                  <div className="">
                    <Image el={el} />
                  </div>

                  <div className="p-2">
                    <h1 className="font-bold sm:text-2xl my-2 text-lg">
                      {el.title}
                    </h1>
                    <p className="text-sm text-gray-600">
                      Par {el.auteur} il y a {getTime(el.createdAt)}
                    </p>
                    <div>
                      <Description el={el} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
