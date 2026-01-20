import BodyHome from "../components/bodyHome";
import Footer from "../components/Footer";
import HeaderHome from "../components/headerHome";

export default function Home() {
  return (
    <div className="relative">
      <HeaderHome />
      <BodyHome />
      <Footer />
    </div>
  );
}
