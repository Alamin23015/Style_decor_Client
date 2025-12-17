import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { 
  FaBars, 
  FaHome, 
  FaUser, 
  FaListAlt, 
  FaCalendarCheck, 
  FaUsers, 
  FaServicestack, 
  FaSignOutAlt, 
  FaPaintRoller,
  FaChartPie 
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  
  const navStyle = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
      isActive 
        ? "bg-primary text-primary-content shadow-lg shadow-primary/30" 
        : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
    }`;

  
  const staticLinkStyle = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content";

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200/50 font-sans">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-40 px-6 border-b border-base-200 shadow-sm">
          <div className="flex-1">
            <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle lg:hidden">
              <FaBars className="text-xl" />
            </label>
            <h1 className="text-xl md:text-2xl font-bold ml-2 text-base-content">
              Welcome back, <span className="text-primary">{user?.displayName?.split(" ")[0]}!</span>
            </h1>
          </div>
          
          <div className="flex-none gap-4">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-primary/20 ring-primary ring-offset-base-100 hover:ring-2 transition-all">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt="User" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
                <li className="px-4 py-2 font-semibold text-center border-b mb-2 border-base-200">
                  {user?.displayName}
                </li>
                <li><Link to="/">Home</Link></li>
                <li><button onClick={handleLogout} className="text-error">Logout</button></li>
              </ul>
            </div>
          </div>
        </div>

       
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>


      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-100 w-80 min-h-full flex flex-col border-r border-base-200 shadow-xl">
          
         
          <div className="h-20 flex items-center justify-center border-b border-base-200 bg-base-100 sticky top-0 z-10">
            <Link to="/" className="text-3xl font-bold font-serif text-primary tracking-wide">
              StyleDecor
            </Link>
          </div>

     
          <ul className="menu p-4 w-full space-y-2 flex-1 overflow-y-auto">
            
           
            {role === "user" && (
              <>
                <li className="menu-title opacity-60 uppercase text-xs font-bold tracking-wider mt-4">User Panel</li>
                <li>
                  <NavLink to="/dashboard" end className={navStyle}>
                    <FaListAlt /> My Bookings
                  </NavLink>
                </li>
                <li><NavLink to="/dashboard/profile" className={navStyle}><FaUser /> My Profile</NavLink></li>
              </>
            )}

           
           {role === "admin" && (
  <>
    <li className="menu-title opacity-60 uppercase text-xs font-bold tracking-wider mt-4">Admin Control</li>
    
   
    <li>
      <NavLink to="/dashboard/admin/analytics" className={navStyle}>
        <FaChartPie /> Statistics
      </NavLink>
    </li>

    <li><NavLink to="/dashboard/admin/services" className={navStyle}><FaServicestack /> Manage Services</NavLink></li>
    <li><NavLink to="/dashboard/admin/users" className={navStyle}><FaUsers /> Manage Users</NavLink></li>
    <li><NavLink to="/dashboard/admin/bookings" className={navStyle}><FaListAlt /> All Bookings</NavLink></li>
  </>
)}

    
            {role === "decorator" && (
              <>
                <li className="menu-title opacity-60 uppercase text-xs font-bold tracking-wider mt-4">Workstation</li>
                <li><NavLink to="/dashboard/decorator/projects" className={navStyle}><FaPaintRoller /> My Projects</NavLink></li>
                <li><NavLink to="/dashboard/decorator/schedule" className={navStyle}><FaCalendarCheck /> Schedule</NavLink></li>
              </>
            )}

            <div className="divider my-4"></div>
            
          
            <li><NavLink to="/" className={navStyle}><FaHome /> Home Page</NavLink></li>
          </ul>

          <div className="p-4 border-t border-base-200">
            <button 
              onClick={handleLogout} 
              className="btn btn-outline btn-error w-full flex items-center gap-2 hover:shadow-md"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;