import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import PaymentModal from "../../../components/PaymentModal";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MyBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const baseUrl = import.meta.env.VITE_SERVER_URL || "https://style-decor-server-production.up.railway.app";

  const fetchMyBookings = () => {
    if (user?.email) {
      axios.get(`${baseUrl}/bookings?email=${user.email}`)
        .then(res => setBookings(res.data))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (!authLoading) fetchMyBookings();
  }, [user, authLoading]);

  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    fetchMyBookings(); // ডাটাবেস থেকে ফ্রেশ ডাটা আনা হবে যাতে "Paid" দেখায়
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-lg mt-3 text-base-content/70">
            Total: <span className="font-bold text-primary">{bookings.length}</span> booking{bookings.length !== 1 && "s"}
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-3xl shadow-xl">
            <div className="w-32 h-32 mx-auto mb-6 opacity-20">
              <FaCalendarAlt className="w-full h-full text-primary" />
            </div>
            <p className="text-2xl font-medium text-base-content/60">No bookings yet</p>
            <p className="text-base-content/50 mt-2">Explore services and book your dream setup!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 rounded-3xl overflow-hidden"
              >
                <figure className="h-48 overflow-hidden">
                  <img
                    src={item.serviceImg || "https://i.ibb.co/0s3pdnc/avatar.png"}
                    alt={item.serviceName}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </figure>

                <div className="card-body p-6">
                  <h3 className="card-title text-xl font-bold text-base-content">
                    {item.service_name || item.serviceName}
                  </h3>

                  <div className="space-y-3 mt-4 text-base">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-primary" />
                      <span>{new Date(item.bookingDate).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMoneyBillWave className="text-success" />
                      <span className="font-bold text-xl text-primary">
                        ৳{(item.cost || item.price || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-base-300">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Payment Status:</span>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm
                        ${item.paymentStatus === "paid" 
                          ? "bg-success/20 text-success border border-success/30" 
                          : "bg-error/20 text-error border border-error/30"}`}
                      >
                        {item.paymentStatus === "paid" ? (
                          <>
                            <FaCheckCircle /> Paid
                          </>
                        ) : (
                          <>
                            <FaTimesCircle /> Unpaid
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {item.paymentStatus !== "paid" && (
                    <button
                      onClick={() => {
                        setSelectedBooking(item);
                        setIsModalOpen(true);
                      }}
                      className="btn btn-primary w-full mt-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔥 এখানে bookingId={selectedBooking?._id} পাস করা হয়েছে */}
        <PaymentModal
          isOpen={isModalOpen}
          onClose={handlePaymentSuccess}
          amount={selectedBooking?.cost || selectedBooking?.price}
          bookingId={selectedBooking?._id} 
        />
      </div>
    </div>
  );
};

export default MyBookings;