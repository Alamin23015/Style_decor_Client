import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaMapMarkerAlt, FaTrashAlt, FaMoneyBillWave } from "react-icons/fa";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axios.get(`http://localhost:5000/bookings?email=${user.email}`)
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error("Failed to load bookings");
        setLoading(false);
        console.error(err);
      });
  }, [user]);

  const handleCancel = (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    axios.delete(`http://localhost:5000/bookings/${id}`)
      .then(res => {
        if (res.data.deletedCount > 0) {
          toast.success("Booking cancelled successfully");
          setBookings(bookings.filter(b => b._id !== id));
        }
      })
      .catch(err => {
        toast.error("Cancel failed");
        console.error(err);
      });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="loading loading-bars loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-base-content">
          My Reservations
        </h2>
        <p className="text-base-content/60 mt-2">
          Manage your upcoming appointments and bookings ({bookings.length})
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-2xl shadow-sm border border-base-200">
          <div className="text-6xl text-gray-300 mb-4">📂</div>
          <p className="text-xl font-medium text-base-content/70">No bookings found yet.</p>
          <p className="text-sm text-base-content/50">Book a service to see it here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="card lg:card-side bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 overflow-hidden group"
            >
              {/* Image Section */}
              <figure className="lg:w-64 h-56 lg:h-auto relative overflow-hidden">
                <img 
                  src={booking.serviceImg} 
                  alt={booking.serviceName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3">
                   <div className={`badge border-none text-white py-3 px-4 font-medium shadow-sm ${
                      booking.status === 'pending' ? 'bg-orange-500' : 'bg-green-600'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                </div>
              </figure>
              
              {/* Content Section */}
              <div className="card-body p-6 lg:p-8">
                <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                  
                  <div className="space-y-3 flex-1">
                    <h3 className="card-title text-2xl font-serif text-base-content">
                      {booking.serviceName}
                    </h3>
                    
                    <div className="space-y-1 text-base-content/70 text-sm md:text-base">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" />
                        <span>{new Date(booking.bookingDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-lg text-primary mt-2">
                        <FaMoneyBillWave />
                        <span>৳ {booking.cost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-center items-end gap-3 mt-4 md:mt-0 border-t md:border-t-0 md:border-l border-base-200 pt-4 md:pt-0 md:pl-6">
                    {booking.status === 'pending' ? (
                      <button 
                        onClick={() => handleCancel(booking._id)}
                        className="btn btn-error btn-outline btn-sm md:btn-md gap-2 rounded-full hover:bg-error hover:text-white transition-colors"
                      >
                        <FaTrashAlt /> Cancel Booking
                      </button>
                    ) : (
                      <span className="text-success font-medium flex items-center gap-2 border border-success/20 px-4 py-2 rounded-full bg-success/5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Confirmed
                      </span>
                    )}
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

export default MyBookings;