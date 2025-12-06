import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center p-10">
              
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                 
                    <li className="mb-4 text-2xl font-bold px-4">StyleDecor</li>
                    
                   
                    <li><Link to="/dashboard/my-bookings">My Bookings</Link></li>
                    <li><Link to="/dashboard/all-users">All Users (Admin)</Link></li>
                    <li><Link to="/dashboard/my-projects">My Projects (Decorator)</Link></li>
                    
                    <div className="divider"></div> 
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;