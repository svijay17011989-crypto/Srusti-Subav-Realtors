import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
      <Header />

      {/* PAGE CONTENT */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
