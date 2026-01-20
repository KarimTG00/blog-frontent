import { useContext, useState } from "react";
import { ListingMock } from "./mockListing";
import { AppContext } from "./context";
import { useNavigate } from "react-router-dom";

export default function BodyHome() {
  const [fistArticle, setFirstArticles] = useState({});
  const { isTablette } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      <main className=" mx-auto p-2">
        <div>
          <h1 className="text-2xl font-semibold m-4">
            Decouvrez les Dernieres actualitées crypto
          </h1>
          <div>{fistArticle && <div></div>}</div>
        </div>
        <div
          className={`${isTablette ? "grid grid-cols-1 w-full gap-4" : "w-full grid grid-cols-1 md:grid-cols-3 gap-3"}`}
        >
          {ListingMock.map((article) => (
            <div
              key={article.id}
              className=" shadow-xl  rounded-lg cursor-pointer hover:scale-101 hover:border-2 hover:border-green-700 duration-100"
              onClick={() => navigate(`/single/${article.id}`)}
            >
              <div className="">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="rounded-lg w-full object-cover h-full"
                  />
                </div>
                <div className="p-2">
                  <h2 className="font-bold sm:text-xl my-2 text-lg">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Par {article.author} le {article.date}
                  </p>
                  <p className="mt-2  whitespace-pre-wrap sm:text-lg text-md">
                    {article.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
