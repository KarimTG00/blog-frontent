import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContext } from "./components/context.jsx";
import Home from "./pages/home.jsx";
import { useMediaQuery } from "react-responsive";
import SinglePage from "./pages/SinglePage.jsx";
import NewsLetter from "./pages/newsLetter.jsx";
function App() {
  const router = createBrowserRouter([
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
  ]);

  const isDesktop = useMediaQuery({ minWidth: 900 });
  const isTablette = useMediaQuery({ minWidth: 640, maxWidth: 899 });
  const isPhone = useMediaQuery({ maxWidth: 639 });

  return (
    <AppContext.Provider value={{ isDesktop, isTablette, isPhone }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
