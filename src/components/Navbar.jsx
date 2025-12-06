// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(error => console.log(error));
  };

  const navOptions = (
    <>
      <li><NavLink to="/" className="font-semibold text-lg hover:text-primary transition">Home</NavLink></li>
      <li className="ml-6"><NavLink to="/services" className="font-semibold text-lg hover:text-primary transition">Services</NavLink></li>
      <li className="ml-6"><NavLink to="/about" className="font-semibold text-lg hover:text-primary transition">About</NavLink></li>
      <li className="ml-6"><NavLink to="/contact" className="font-semibold text-lg hover:text-primary transition">Contact</NavLink></li>
      {!user && (
        <li className="ml-6"><NavLink to="/register" className="font-semibold text-lg hover:text-primary transition">Register</NavLink></li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 z-50 px-4 lg:px-12">
      {/* Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-64 space-y-3">
            {navOptions}
          </ul>
        </div>

        <Link to="/" className="text-2xl md:text-3xl font-bold">
          Style<span className="text-orange-500">Decor</span>
        </Link>
      </div>

     
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-10 items-center">
          {navOptions}
        </ul>
      </div>

      
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
          
            <div className="avatar tooltip tooltip-bottom" data-tip={user?.displayName || "User"}>
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || "https://i.ibb.co/T0x4D0H/user.png"} alt="user" />
              </div>
            </div>

          <button onClick={handleLogOut} className="btn px-8 bg-blue-500 text-white">
  Logout
</button>

          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="btn btn-success px-8">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;