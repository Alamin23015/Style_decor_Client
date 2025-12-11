// src/pages/Dashboard/Admin/AllBookings.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

   const baseUrl = import.meta.env.VITE_SERVER_URL || 'https://style-decor-server-production.up.railway.app';


  useEffect(() => {
    axios.get(`${baseUrl}/admin/bookings`)
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        All Bookings ({bookings.length})
      </h2>

      <div className="overflow-x-auto shadow-2xl rounded-2xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-base-content">
            <tr className="text-left text-sm md:text-base">
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4 hidden sm:table-cell">Date</th>
              <th className="p-4 hidden md:table-cell">Location</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-base-200 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={b.customerPhoto || "/avatar.png"} alt="customer" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{b.customerName}</div>
                      <div className="text-sm opacity-70">{b.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-medium">{b.serviceName}</td>
                <td className="p-4 hidden sm:table-cell">
                  {format(new Date(b.bookingDate), "dd MMM yyyy")}
                </td>
                <td className="p-4 hidden md:table-cell">{b.location}</td>
                <td className="p-4 text-xl font-bold text-primary">৳{b.cost}</td>
                <td className="p-4">
                  <div className={`badge badge-lg font-medium ${
                    b.status === "pending" ? "badge-warning" : 
                    b.status === "confirmed" ? "badge-success" : "badge-ghost"
                  }`}>
                    {b.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;