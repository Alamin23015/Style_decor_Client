import useAuth from "../../../hooks/useAuth";
import { FaUsers, FaServicestack, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-primary text-primary-content p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-serif font-bold">Admin Dashboard</h2>
        <p className="mt-2 opacity-90">Welcome back, {user?.displayName}. Here is what's happening today.</p>
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-base-100 shadow-md rounded-xl border border-base-200">
          <div className="stat-figure text-primary">
            <FaServicestack className="text-3xl" />
          </div>
          <div className="stat-title">Total Services</div>
          <div className="stat-value text-primary">12</div>
          <div className="stat-desc">Available for booking</div>
        </div>

        <div className="stat bg-base-100 shadow-md rounded-xl border border-base-200">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-secondary">48</div>
          <div className="stat-desc">Registered users</div>
        </div>

        <div className="stat bg-base-100 shadow-md rounded-xl border border-base-200">
          <div className="stat-figure text-accent">
            <FaChartLine className="text-3xl" />
          </div>
          <div className="stat-title">Bookings</div>
          <div className="stat-value text-accent">25</div>
          <div className="stat-desc">This month</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;