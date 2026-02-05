import BodyHome from "../components/bodyHome";
import Footer from "../components/Footer";
import HeaderHome from "../components/headerHome";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen border">
      <HeaderHome />
      <div className="flex-1">
        <BodyHome />
      </div>
      <Footer />
    </div>
  );
}
