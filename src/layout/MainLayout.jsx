import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        <Outlet />   {/* এই লাইন না থাকলে কোনো পেজ দেখাবে না */}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;