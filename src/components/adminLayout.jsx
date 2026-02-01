import { Outlet } from "react-router-dom";
import HeaderAdmin from "./admin/headerAdmin";

export default function LayoutAdmin() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAdmin />
      <main className="flex-1 flex flex-col ">
        <Outlet />
      </main>
    </div>
  );
}
