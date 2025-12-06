import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        { !user && <li><NavLink to="/register">Register</NavLink></li> }
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
  Style<span className="text-orange-500">Decor</span>
</Link>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-2">
                         <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || "https://i.ibb.co/T0x4D0H/user.png"} />
                            </div>
                        </div>
                        <button onClick={handleLogOut} className="btn btn-sm btn-error text-white">LogOut</button>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary bg-orange-500 border-none text-white">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;