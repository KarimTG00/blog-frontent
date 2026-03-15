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
import useAuthorization from "./components/Authentification.jsx";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { getArticle, DeleteArticle } from "./components/requetes/api.jsx";

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
  const queryClient = useQueryClient();

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
  // const {
  //   isLoading,
  //   isError,
  //   data: article,
  // } = useQuery({
  //   queryKey: ["articles"],
  //   queryFn: getArticle,
  //   select: (rawData) => {
  //     return rawData.map((el) => {
  //       const parsed = [];
  //       el.content.forEach((child) => {
  //         extractText(child, parsed);
  //       });
  //       return { ...el, content: parsed };
  //     });
  //   },
  // });

  const {
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["text"],
    queryFn: ({ pageParam }) => getArticle(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    select: (rawData) => ({
      pages: rawData.pages.map((page) => ({
        ...page,
        data: page.data.map((el) => {
          const parsed = [];
          el.content.forEach((child) => {
            extractText(child, parsed);
          });
          return { ...el, content: parsed };
        }),
      })),
      pageParams: rawData.pageParams,
    }),
  });

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

  const createMutation = useMutation({
    mutationFn: (id) => DeleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article"] });
      console.log("article suprimé");
    },
  });

  function deleted(id) {
    createMutation.mutate(id);
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
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        data,
        DeleteArticle,
        extractText,
        authorized,
        loadingAuth,
        deleted,
        hasNextPage,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
