import { useNavigate, useParams } from "react-router-dom";
import { ListingMock } from "../components/mockListing";
import React, { useContext, useEffect, useState } from "react";
import HeaderHome from "../components/headerHome";
import { AppContext } from "../components/context";
import { ThumbsUp } from "lucide-react";
import Footer from "../components/Footer";

export default function SinglePage() {
  const navigate = useNavigate();

  const { isDesktop, isTablette, article, isPhone } = useContext(AppContext);
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

  useEffect(() => {
    async function getArticle() {
      try {
        const res = await fetch(`http://localhost:4000/article/${id}`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });

        if (!res.ok) {
          if (res.status === 500 || res.status === 501) {
            const data = await res.json();
            console.log(data);
            return;
          }
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
        console.log("voici l'erreur", error);
      }
    }
    getArticle();
  }, []);

  console.log("voici le singleArticle", singleArticle);
  function findImage(data) {
    if (!data || !data.content) return null;
    for (const node of data.content) {
      if (node.type === "image") return node;
      return null;
    }
    return null;
  }

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
    <div className="h-full">
      <HeaderHome />
      <div className="flex flex-col sm:gap-5">
        {singleArticle && (
          <div>
            {image && (
              <img
                src={image.src}
                alt="une image"
                className="w-full object-cover max-h-120"
              />
            )}
          </div>
        )}
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
                  singleArticle.content.slice(1).map((el, index) => (
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
                className={`lg:grid-cols-3 lg:gap-3 sm:grid-cols-2 sm:gap-3 grid-cols-1 gap-1 grid space-y-5`}
              >
                {otherArticle().map((el, index) => (
                  <li
                    key={index}
                    className="hover:border-2 mx-2 sm:mx-0 not-even:hover:rounded-lg hover:border-green-700 hover:scale-101 duration-75 rounded-lg  border sm:h-40"
                    onClick={() => navigate(`/single/${el.id}`)}
                  >
                    <div className="flex shadow-sm gap-2 items-center cursor-pointer h-full">
                      <div className="aspect-video">
                        <img
                          src={el.img}
                          alt="photo"
                          className={`lg:size-30 lg:w-30 lg:h-20 sm:w-25 sm:h-15w-25 h-15 object-cover rounded-lg`}
                        />
                      </div>
                      <div className="p-3 sm:p-3">
                        <h2 className="font-semibold md:text-xl">{el.title}</h2>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Articles recents */}
        </div>
      </div>

      {/* {article && (
      
            Articles recents
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
                      onClick={() => navigate(`/single/${el.id}`)}
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
      )} */}
      <Footer />
    </div>
  );
}
