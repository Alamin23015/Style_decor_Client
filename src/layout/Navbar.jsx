import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { toast } from "react-toastify";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  
  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };


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
              <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2 pl-0">
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
           
            <button 
              onClick={toggleTheme} 
              className="btn btn-ghost btn-circle btn-sm hover:bg-base-200 transition-transform hover:rotate-90"
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={20} className="text-yellow-400" />}
            </button>

            {user ? (
                <div className="dropdown dropdown-end z-50">
                    {/* Avatar Trigger */}
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online transition-transform hover:scale-105">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img alt="User Profile" src={user?.photoURL || "https://i.ibb.co/tYw54p7/user-placeholder.png"} />
                        </div>
                    </div>

               
                    <ul tabIndex={0} className="menu menu-md dropdown-content mt-4 z-[50] p-2 shadow-2xl bg-base-100 rounded-xl w-72 border border-base-200 font-medium">
                        
                     
                        <li className="menu-title p-0 mb-2">
                            <div className="flex flex-col items-center justify-center bg-base-200/50 py-4 rounded-t-lg px-4 text-center">
                                <h3 className="font-bold text-lg text-primary truncate max-w-[250px]">{user?.displayName || "User Name"}</h3>
                                <p className="text-sm opacity-70 truncate max-w-[250px]">{user?.email}</p>
                            </div>
                        </li>

                        <li>
                            <Link to="/dashboard" className="py-3 hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25z" /></svg>
                                Dashboard
                            </Link>
                        </li>
                        
                       
                        <li>
                            <Link to="/dashboard/profile" className="py-3 hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                                View Profile
                            </Link>
                        </li>

                        <div className="divider my-1 px-2"></div>

                   
                        <li>
                            <button onClick={handleLogout} className="py-3 text-error hover:bg-error/10 font-semibold">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
               <div className="flex gap-3">
                <Link to="/login" className="btn btn-primary rounded-full px-6">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline rounded-full px-6">
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