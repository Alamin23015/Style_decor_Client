// src/layout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-10 bg-base-100">
        <Outlet />   {/* এই লাইনটা না থাকলে কোনো পেজ দেখাবে না! */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;