import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      {/* ন্যাপবার সবসময় উপরে থাকবে */}
      <Navbar />
      
      {/* ডাইনামিক কন্টেন্ট বা পেজগুলো এখানে লোড হবে */}
      <div className="min-h-[calc(100vh-300px)]">
        <Outlet />
      </div>

      {/* ফুটার সবসময় নিচে থাকবে */}
      <Footer />
    </div>
  )
}

export default App;