import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { toast } from "react-toastify";
import { FaSun, FaMoon, FaSignOutAlt, FaUserCircle, FaBars } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };

  // Active Link Design
  const navLinkStyles = ({ isActive }) => {
    return isActive
      ? "text-primary font-bold text-base px-3 py-2 rounded-lg bg-primary/10 transition-all"
      : "text-base font-medium text-gray-600 dark:text-gray-300 px-3 py-2 hover:text-primary transition-all";
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
      <li><NavLink to="/services" className={navLinkStyles}>Services</NavLink></li>
      <li><NavLink to="/about" className={navLinkStyles}>About</NavLink></li>
      <li><NavLink to="/contact" className={navLinkStyles}>Contact</NavLink></li>
    </>
  );

  return (
   
    <div className="w-full fixed top-0 z-50 bg-base-100/90 backdrop-blur-lg border-b border-base-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="navbar py-3 md:py-4"> 
          
         
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden mr-2 pl-0">
                <FaBars className="text-xl" />
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-box w-64 gap-2">
                {navLinks}
               
                {!user && (
                <li className="mt-2">
  <Link 
    to="/register" 
    className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 w-full"
  >
    Register Now
  </Link>
</li>

                )}
              </ul>
            </div>
            
            <Link to="/" className="flex items-center gap-1 text-xl md:text-2xl font-bold tracking-tight">
              Style<span className="text-primary">Decor</span>
              <div className="w-2 h-2 bg-primary rounded-full mt-3 ml-1"></div> 
            </Link>
          </div>

       
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-4">
              {navLinks}
            </ul>
          </div>

 
          <div className="navbar-end gap-2 md:gap-3">
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="btn btn-ghost btn-circle btn-sm hover:bg-base-200 transition-transform hover:rotate-90"
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={20} className="text-yellow-400" />}
            </button>

            {user ? (
        
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-base-300 hover:shadow-md transition-all">
                  <div className="w-9 md:w-10 rounded-full">
                    <img src={user?.photoURL || "https://i.ibb.co/T0x4D0H/user.png"} alt="avatar" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-56 border border-base-200">
                  <li className="px-4 py-3 border-b border-base-200">
                    <span className="font-bold text-primary block">{user?.displayName}</span>
                    <span className="text-xs text-gray-500">View Profile</span>
                  </li>
                  <li className="mt-2"><Link to="/dashboard"><FaUserCircle /> Dashboard</Link></li>
                  <li><button onClick={handleLogout} className="text-red-500 hover:bg-red-50"><FaSignOutAlt /> Logout</button></li>
                </ul>
              </div>
            ) : (
            
              <div className="flex items-center gap-2">
                
               
                <Link 
                  to="/login" 
                  className="btn btn-sm md:btn-md bg-[#2563EB] hover:bg-[#1d4ed8] border-none text-white rounded-full px-4 md:px-6 shadow-sm"
                >
                  Login
                </Link>

               
                <Link 
                  to="/register" 
                  className="hidden sm:flex btn btn-sm md:btn-md btn-ghost font-bold hover:bg-base-200 rounded-full px-4"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;