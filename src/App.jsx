import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContext } from "./components/context.jsx";
import Home from "./pages/home.jsx";
import { useMediaQuery } from "react-responsive";
import SinglePage from "./pages/SinglePage.jsx";
import NewsLetter from "./pages/newsLetter.jsx";
import { useState } from "react";
import LoginAdmin from "./pages/loginAdmin.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import Layout from "./components/ScrolloTop.jsx";
import LayoutAdmin from "./components/adminLayout.jsx";
import Articles from "./pages/admin/Articles.jsx";
import NewArticles from "./pages/admin/newArticle.jsx";
import SingleArticles from "./pages/admin/singleArticle.jsx";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import useAuthorization from "./components/Authentification.jsx";
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/single/:id",
          element: <SinglePage />,
        },
        {
          path: "/inscription",
          element: <NewsLetter />,
        },
        {
          path: "/admin",
          element: <LoginAdmin />,
        },
        {
          path: "/admin/dashboard",
          element: <LayoutAdmin />,
          children: [
            {
              path: "/admin/dashboard",
              element: <AdminDashboard />,
            },
            {
              path: "/admin/dashboard/articles",
              element: <Articles />,
            },
            {
              path: "/admin/dashboard/articles/new",
              element: <NewArticles />,
            },
            {
              path: "/admin/dashboard/articles/:id",
              element: <SingleArticles />,
            },
          ],
        },
      ],
    },
  ]);

  const [menuTrue, setMenuTrue] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 900 });
  const isTablette = useMediaQuery({ minWidth: 640, maxWidth: 899 });
  const isPhone = useMediaQuery({ maxWidth: 639 });
  const [article, setArticle] = useState([]);

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
    } // pour les titres
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
      return result;
    }

    // si le noeud a des enfants on rappels la fonction
    if (Array.isArray(node.content)) {
      node.content.forEach((child) => extractText(child, result));
    }

    return result;
  }

  const { authorized, loadingAuth } = useAuthorization("getArticles", "GET"); // on recupére l'etat de la verification du token

  // on gére la recuperation des articles
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [errorArticles, setErrorArticles] = useState(false);
  useEffect(() => {
    async function getDoc() {
      try {
        setLoadingArticles(true);
        const res = await fetch(`${API_URL}/articles`, {
          method: "get",
          headers: { "Content-type": "application/json" },
        });

        if (!res.ok) {
          if (res.status === 500) {
            const data = await res.json();
            console.log("une erreur : ", data);
            setErrorArticles(true);
            return;
          }
          const data = await res.text();
          setErrorArticles(true);
          console.log(data);
          return;
        }

        const data = await res.json(); // tableau de tous les articles

        // on formate le contenu tiptap en contenu utilisable
        data.forEach((el) => {
          const parsed = [];
          el.content.forEach(
            (child) => {
              extractText(child, parsed);
            },
            (el.content = parsed),
          );
        });
        setArticle(data);
      } catch (error) {
        setErrorArticles(true);
        console.log("une erreur lors de la recuperation des articles :", error);
        return `voici l'erreur: ${error}`;
      } finally {
        setLoadingArticles(false);
      }
    }
    getDoc();
  }, []);

  // on crée l'editeur tiptap
  const editor = useEditor({
    extensions: [
      StarterKit, // definition de l'extention du tableau
      Link.configure({
        openOnclick: false, // eviter l'ouverture pendant l'edition
        HTMLAttributes: {
          class: "underline text-blue-500 cursor-pointer",
        },
      }),
      Image,
    ],
    // onUpdate: ({ editor }) => {
    //   setContentJSON(editor.getHTML());
    // },
    content: "entrer un texte...", // contenu initial
    editorProps: {
      attributes: {
        class: `min-h-130 bg-slate-200 border-b border-l border-r rounded-b-md border-gray-300 py-2 px-3  focus:outline-none`,
      },
    },
  });

  async function DeleteArticle(id) {
    // todo delete article function
    try {
      const res = await fetch(`${API_URL}/deleteArticle/${id}`, {
        method: "delete",
        headers: { "Content-type": "application/json" },
      });

      if (!res.ok) {
        if (res.status === 404) {
          const data = await res.json();
          console.log("erreur lors de la suppression :", data);
          return;
        }
        if (res.status === 500) {
          const data = await res.json();
          console.log("une erreur lors de la suppression :", data);
          return;
        }
        const data = await res.text();
        console.log("une erreur lors de la suppression :", data);
        return;
      }

      const data = await res.json();
      console.log("article supprimé avec succès :", data);
    } catch (error) {
      console.log("une erreur lors de la suppression de l'article :", error);
    }
  }

  return (
    <AppContext.Provider
      value={{
        isDesktop,
        isTablette,
        isPhone,
        menuTrue,
        setMenuTrue,
        editor,
        article,
        setArticle,
        loadingArticles,
        errorArticles,
        DeleteArticle,
        extractText,
        authorized,
        loadingAuth,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
