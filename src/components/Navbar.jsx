import { Link, NavLink } from 'react-router-dom'
//import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { user, logOut } = useAuth()

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(err => console.log(err))
  }

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/services">Services</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  )

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 fixed top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold text-primary">
          StyleDecor
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://i.ibb.co.com/5yQ7jQK/user.png"} alt="user" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar