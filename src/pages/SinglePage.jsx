import { useParams } from "react-router-dom";
import { ListingMock } from "../components/mockListing";
import { useContext, useEffect, useState } from "react";
import HeaderHome from "../components/headerHome";
import { AppContext } from "../components/context";
import { ThumbsUp } from "lucide-react";
import Footer from "../components/Footer";

export default function SinglePage() {
  const { isDesktop, isTablette, isPhone } = useContext(AppContext);
  const { id } = useParams();
  console.log(id);
  const [article, setArticle] = useState();
  const [liked, setLiked] = useState(false);
  const [articleRecent, setArticleRecent] = useState();

  useEffect(() => {
    const found = ListingMock.find((el) => el.id === Number(id));
    setArticle(found);
  }, [id]);

  return (
    <div className="h-full">
      <HeaderHome />
      {article && (
        <div>
          <div className="flex flex-col gap-5">
            <div>
              <img
                src={article.img}
                alt=""
                className="w-full object-cover max-h-120"
              />
            </div>
            <div
              className={`${isDesktop ? "ex flex-col gap-5 max-w-180 mx-auto text-lg" : "flex flex-col gap-5 mx-2"}`}
            >
              <div className={`${isDesktop ? "sm:text-center" : "text-left"}`}>
                <h1 className="text-3xl sm:text-4xl font-bold my-5">
                  {article.title}
                </h1>
              </div>
              <div
                className={`${isDesktop || isTablette ? "flex gap-8 items-center sm:justify-center" : "space-x-3"}`}
              >
                <span className="text-gray-500 text-lg">{article.date} /</span>
                <span className="text-gray-500 text-lg">Par CryptoBlog /</span>
                <span className="text-gray-500 text-lg">2 min de lecture/</span>
                <span className="text-gray-500 text-lg">Crytpomonaies</span>
              </div>
              <div className="mt-8 ">
                <p
                  className={`${isDesktop || isTablette ? "text-xl" : "text-lg"} whitespace-pre-wrap text-gray-900`}
                >
                  {article.content}
                </p>
                <div className="flex items-center gap-2 mt-8 justify-center">
                  <p className="text-lg"> Vous avez aimé cette article ? </p>
                  <button
                    type="button"
                    aria-pressed={liked}
                    onClick={() => setLiked((prev) => !prev)}
                    className="outline-none"
                  >
                    <ThumbsUp
                      className={liked ? "text-blue-800" : "text-gray-500"}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Articles recents */}
            <div
              className={`${isDesktop || isTablette ? "px-10" : "px-0"} space-y-5`}
            >
              <div className="flex items-center gap-2">
                <div className="h-10 w-2 rounded-lg bg-orange-600"></div>
                <h2 className="text-lg font-semibold md:text-3xl">
                  Articles récents
                </h2>
              </div>
              <div className="mb-10">
                <ul
                  className={`${isDesktop && "grid-cols-3 gap-3"} ${isTablette && "grid-cols-2 gap-3"} ${isPhone && "grid-cols-1 gap-1"} grid space-y-5`}
                >
                  {ListingMock.slice(-6).map((el, index) => (
                    <li
                      key={index}
                      className="hover:border-2 mx-2 sm:mx-0 not-even:hover:rounded-lg hover:border-green-700 hover:scale-101 duration-75 rounded-lg"
                    >
                      <div className="flex shadow-sm gap-2 items-center cursor-pointer">
                        <div className="aspect-video">
                          <img
                            src={el.img}
                            alt="photo"
                            className={`${isDesktop && "size-30 w-30 h-20"} ${isTablette && "w-25 h-15"} ${isPhone && "w-25 h-15"} object-cover rounded-lg`}
                          />
                        </div>
                        <div className="p-3 sm:p-3">
                          <h2 className="font-semibold md:text-xl">
                            {el.title}
                          </h2>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
