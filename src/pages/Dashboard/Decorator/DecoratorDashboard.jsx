import { useEffect, useState } from "react";
import axios from "axios";

const DecoratorDashboard = () => {
  const [projects, setProjects] = useState([]);
  const baseUrl = import.meta.env.VITE_SERVER_URL || "https://style-decor-server.onrender.com"
  useEffect(() => {
    axios.get(`${baseUrl}/admin/bookings`) 
      .then(res => {
        setProjects(res.data.filter(b => b.status === "pending")); 
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-8">My Projects ({projects.length})</h2>
      <div className="grid gap-6">
        {projects.map(p => (
          <div key={p._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{p.serviceName}</h3>
              <p>Customer: {p.customerName}</p>
              <p>Date: {new Date(p.bookingDate).toLocaleDateString()}</p>
              <p>Location: {p.location}</p>
              <select defaultValue={p.status} className="select select-bordered w-full max-w-xs">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecoratorDashboard;