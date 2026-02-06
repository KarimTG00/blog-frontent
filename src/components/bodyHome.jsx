import { useContext } from "react";
import { ListingMock } from "./mockListing";
import { AppContext } from "./context";
import { useNavigate } from "react-router-dom";

import Description from "./admin/description";
import Image from "./admin/Image";
import { getTime } from "./date";

export default function BodyHome() {
  const { isTablette } = useContext(AppContext);
  const { article } = useContext(AppContext);

  console.log("voici l'article ", article);

  const navigate = useNavigate();
  return (
    <>
      <main className=" mx-auto p-2 px-4 lg:px-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold my-4">
            Decouvrez les Dernieres actualitées cryptos
          </h1>
        </div>
        <div
          className={`${isTablette ? "grid grid-cols-1 w-full gap-4" : "w-full grid grid-cols-1 md:grid-cols-3 gap-3"}`}
        >
          {article &&
            article.map((el, index) => (
              <div
                key={index}
                className=" shadow-sm  rounded-lg cursor-pointer hover:scale-101 hover:border-2 hover:border-green-700 duration-100"
                onClick={() => navigate(`/single/${el._id}`)}
              >
                <div>
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
            ))}
        </div>
      </main>
    </>
  );
}
