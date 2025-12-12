// src/pages/Dashboard/Decorator/MyProjects.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaWallet, FaCheckCircle, FaClock } from "react-icons/fa";

const MyProjects = () => {
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  const statusSteps = [
    "Assigned",
    "Planning Phase",
    "Materials Prepared",
    "On the Way to Venue",
    "Setup in Progress",
    "Completed"
  ];

  useEffect(() => {
    if (!authLoading && user?.email) {
      axios.get(`${baseUrl}/bookings/decorator/${user.email}`)
        .then(res => {
          setProjects(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user, authLoading, baseUrl]);

  const totalEarnings = projects
    .filter(p => p.status === "Completed" && p.paymentStatus === "paid")
    .reduce((sum, p) => sum + (parseFloat(p.cost || p.price) || 0), 0);

  const handleStatusChange = (id, newStatus) => {
    axios.patch(`${baseUrl}/bookings/status/${id}`, { status: newStatus })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          toast.success(`Status → ${newStatus}`);
          setProjects(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
        }
      })
      .catch(() => toast.error("Update failed"));
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="stat bg-gradient-to-br from-primary/10 to-primary/5 border-l-4 border-primary rounded-2xl p-6 shadow-lg">
          <div className="stat-figure text-primary"><FaWallet className="text-4xl" /></div>
          <div className="stat-title">Total Earnings</div>
          <div className="stat-value text-primary">৳{totalEarnings.toLocaleString()}</div>
        </div>
        <div className="stat bg-gradient-to-br from-secondary/10 to-secondary/5 border-l-4 border-secondary rounded-2xl p-6 shadow-lg">
          <div className="stat-figure text-secondary"><FaCheckCircle className="text-4xl" /></div>
          <div className="stat-title">Active Projects</div>
          <div className="stat-value text-secondary">
            {projects.filter(p => p.status !== "Completed").length}
          </div>
        </div>
        <div className="stat bg-gradient-to-br from-info/10 to-info/5 border-l-4 border-info rounded-2xl p-6 shadow-lg">
          <div className="stat-figure text-info"><FaClock className="text-4xl" /></div>
          <div className="stat-title">Pending Payment</div>
          <div className="stat-value text-info">
            {projects.filter(p => p.paymentStatus !== "paid").length}
          </div>
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        My Assigned Projects
      </h2>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-3xl shadow-lg">
          <p className="text-2xl text-base-content/60">No projects assigned yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-base-300">
             
              <div className={`px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 ${item.paymentStatus === "paid" ? "bg-success/10" : "bg-warning/10"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${item.paymentStatus === "paid" ? "bg-success" : "bg-warning"} animate-pulse`}></div>
                  <span className="font-bold text-lg">
                    {item.paymentStatus === "paid" ? "Payment Received" : "Awaiting Payment"}
                  </span>
                </div>
                <div className="text-3xl font-black text-primary">
                  ৳{(item.cost || item.price || 0).toLocaleString()}
                </div>
              </div>

             
              <div className="card-body p-6">
                <h3 className="card-title text-2xl mb-4">{item.service_name || item.serviceName}</h3>

                <div className="space-y-4 text-base">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-primary" />
                    <span><strong>Client:</strong> {item.customerName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-primary" />
                    <span><strong>Date:</strong> {new Date(item.bookingDate).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-primary" />
                    <span className="truncate"><strong>Venue:</strong> {item.location || item.address}</span>
                  </div>
                </div>

                <div className="divider my-6"></div>

               
               <div className="mt-6">
  <label className="label pb-2">
    <span className="label-text font-bold text-base">Update Project Status</span>
  </label>
  <div className="relative">
    <select
      value={item.status || "Assigned"}
      onChange={(e) => handleStatusChange(item._id, e.target.value)}
      className="w-full h-14 px-5 text-lg font-medium rounded-2xl
                 bg-gradient-to-r from-primary/10 to-secondary/10
                 border-2 border-primary/30
                 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20
                 appearance-none cursor-pointer
                 transition-all duration-300"
    >
      {statusSteps.map(step => (
        <option key={step} value={step} className="bg-base-100 text-base-content py-3">
          {step}
        </option>
      ))}
    </select>

    <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth={3} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjects;