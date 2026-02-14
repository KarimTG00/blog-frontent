import { useContext } from "react";
import BodyHome from "../components/bodyHome";
import Footer from "../components/Footer";
import HeaderHome from "../components/headerHome";
import { AppContext } from "../components/context";

export default function Home() {
  const { loadingArticles } = useContext(AppContext);
  return (
    <div className="relative flex flex-col border ">
      <HeaderHome />
      <main className={`flex-1 ${loadingArticles && "min-h-[120vh]"} `}>
        <BodyHome />
      </main>
      <Footer />
    </div>
  );
}
