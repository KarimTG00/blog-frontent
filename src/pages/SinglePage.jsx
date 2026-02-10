import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import HeaderHome from "../components/headerHome";
import { AppContext } from "../components/context";
import { ThumbsUp } from "lucide-react";
import Footer from "../components/Footer";
import Loading from "../components/loading";
import ErrorArticle from "../components/errorArticle";
import ImageRecent from "../components/imageRecent";

export default function SinglePage() {
  const navigate = useNavigate();

  const { isDesktop, isTablette, article } = useContext(AppContext);
  const [liked, setLiked] = useState(false);

  const [singleArticle, setSingleArticle] = useState();

  function extractText(node, result = []) {
    if (node.type === "text" && node.text) {
      // on verifie si le texte est en bold ou c'est un link
      const isBold = node.marks?.some((mark) => mark.type === "bold");
      const isLink = node.marks?.find((mark) => mark.type === "link");

      result.push({
        type: "text",
        value: node.text,
        bold: !!isBold,
        link: isLink?.attrs?.href ?? null,
      });
      return result;
    }

    if (node.type === "hardBreak") {
      result.push({
        type: "break",
        value: `<br />`,
      });
      return result;
    }

    if (node.type === "paragraph" && node.content) {
      const texts = [];
      node.content?.forEach((child) => extractText(child, texts));

      result.push({
        type: "paragraph",
        content: texts.map((el) => el.value).join(""),
      });
    }

    // pour les titres
    if (node.type === "heading") {
      const texts = [];
      node.content?.forEach((child) => extractText(child, texts));
      result.push({
        type: "heading",
        level: node.attrs?.level ?? 1,
        content: texts.map((el) => el.value).join(""),
      });
    }

    // pour les images
    if (node.type === "image" && node.attrs?.src) {
      result.push({
        type: "image",
        src: node.attrs.src,
      });
    }

    // si le noeud a des enfants on rappels la fonction
    if (Array.isArray(node.content)) {
      node.content.forEach((child) => extractText(child, result));
    }

    return result;
  }

  function texts(el) {
    if (el.type === "image") {
      return (
        <div className="aspect-video overflow-hidden">
          <img
            src={el.src}
            alt="une image"
            className="rounded-lg w-full object-cover h-full"
          />
        </div>
      );
    }
    if (el.type === "heading") {
      if (el.level === 1) {
        return <h1>{el.content}</h1>;
      }
      if (el.level === 2) {
        return <h2>{el.content}</h2>;
      }
      return <h3>{el.content}</h3>;
    }
    if (el.type === "break") {
      return <br />;
    }
    if (el.type === "text") {
      if (el.bold) {
        return (
          <strong
            className={`sm:text-xl text-lg whitespace-pre-wrap text-gray-900 `}
          >
            {el.value}
          </strong>
        );
      }

      if (el.link)
        return (
          <a
            href={el.link}
            className="text-green-600 hover:underline cursor-pointer"
          >
            {el.value}
          </a>
        );

      return (
        <span
          className={`sm:text-xl text-lg whitespace-pre-wrap text-gray-900`}
        >
          {el.value}
        </span>
      );
    }
  }

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getArticle() {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/article/${id}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
          },
        );

        if (!res.ok) {
          if (res.status === 500 || res.status === 501) {
            const data = await res.json();
            console.log(data);
            setError(true);
            return;
          }
          setError(true);
          const data = await res.text();
          console.log(data);
          return;
        }

        const data = await res.json();

        // on format l'article tiptap en objet utilisable
        const parsed = [];
        for (const el of data.content) {
          const result = [];
          extractText(el, result); // on appelle la fonction d'extraction de texte
          parsed.push(...result);
        }

        setSingleArticle({ ...data, content: parsed });
      } catch (error) {
        setError(true);
        console.log("voici l'erreur", error);
      } finally {
        setLoading(false);
      }
    }
    getArticle();
  }, []);

  console.log("voici le singleArticle", singleArticle);

  // fonction pour trouver la première image de l'article
  function findImage(data) {
    if (!data || !data.content) return null;
    for (const node of data.content) {
      if (node.type === "image") return node;
      return null;
    }
    return null;
  }

  // fonction pour trouver les autres articles sauf celui affiché

  function otherArticle() {
    const others = article.filter((el) => el._id !== id);
    if (others) {
      return others.length < 4
        ? others.slice(0, others.length)
        : others.slice(0, 4);
    } else {
      return;
    }
  }
  const image = findImage(singleArticle);

  return (
    <div className="h-full flex flex-col">
      <HeaderHome />

      <div className="min-h-screen flex flex-col">
        {loading && (
          <div className="min-w-full flex-1 flex items-center pb-20">
            <Loading />
          </div>
        )}
        {error && (
          <div className="min-w-full flex-1 flex items-center pb-20">
            <ErrorArticle />
          </div>
        )}
        {!loading && singleArticle && (
          <div className="flex-1 flex-col sm:gap-5">
            <div>
              {image && (
                <img
                  src={image.src}
                  alt="une image"
                  className="w-full object-cover max-h-120"
                />
              )}
            </div>

            <div className="sm:w-4xl mx-3 px-5 sm:mx-auto">
              <div className={`${isDesktop ? "sm:text-center" : "text-left"}`}>
                <h1 className="text-3xl lg:text-5xl sm:text-4xl font-bold my-5">
                  {singleArticle && singleArticle.title}
                </h1>
              </div>
              <div
                className={`${isDesktop || isTablette ? "flex gap-8 items-center sm:justify-center" : "space-x-3"}`}
              >
                <span className="text-gray-500 text-lg">
                  {singleArticle && singleArticle.createdAt} /
                </span>
                <span className="text-gray-500 text-lg">
                  Par {singleArticle && singleArticle.auteur} /
                </span>
                <span className="text-gray-500 text-lg">
                  {singleArticle && singleArticle.durer} min de lecture/
                </span>
                <span className="text-gray-500 text-lg">Crytpomonaies</span>
              </div>
              <div className="mt-8 ">
                <div>
                  <p
                    className={`${isDesktop || isTablette ? "text-xl" : "text-lg"} whitespace-pre-wrap text-gray-900 mx-auto`}
                  >
                    {" "}
                    {singleArticle &&
                      singleArticle?.content.slice(1).map((el, index) => (
                        <React.Fragment key={index}>{texts(el)}</React.Fragment> //on utilise react.fragment pour rendre chaque le contenu de chaque balise progressivement
                      ))}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-8 justify-center mb-10">
                  <p className="text-lg"> Vous avez aimé cette article ? </p>
                  <button
                    type="button"
                    aria-pressed={liked}
                    onClick={() => setLiked((prev) => !prev)}
                    className="outline-none cuspr-pointer"
                  >
                    <ThumbsUp
                      className={liked ? "text-blue-800" : "text-gray-500"}
                    />
                  </button>
                </div>
              </div>

              <div className={`space-y-5`}>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-2 rounded-lg bg-orange-600"></div>
                  <h2 className="text-2xl font-semibold md:text-3xl">
                    Articles récents
                  </h2>
                </div>
                <div className="mb-10">
                  <ul
                    className={`sm:grid-cols-2 sm:gap-3 grid-cols-1 gap-1 grid space-y-5`}
                  >
                    {otherArticle()?.map((el, index) => (
                      <Link to={`/single/${el._id}`}>
                        <li
                          key={index}
                          className=" mx-2 hover:scale-101 duration-75 rounded-lg sm:h-fit max-h-40 hover:text-green-700"
                        >
                          <div className="flex gap-2 items-center cursor-pointer h-fit">
                            <div className="rounded-lg overflow-hidden size-15">
                              <ImageRecent el={el} />
                            </div>

                            <div className="">
                              <h2 className="font-semibold md:text-xl">
                                {el.title}
                              </h2>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Articles recents */}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
