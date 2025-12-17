import { useEffect, useState, useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import useAuth from "../../../hooks/useAuth";
import PaymentModal from "../../../components/PaymentModal";
import { FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure(); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Cancellation states
  const [cancelBooking, setCancelBooking] = useState(null);
  const cancelModalRef = useRef(null);

  const fetchMyBookings = () => {
    if (user?.email) {
      axiosSecure.get(`/bookings?email=${user.email}`)
        .then(res => {
            console.log("Bookings Data:", res.data); 
            setBookings(res.data);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (!authLoading) fetchMyBookings();
  }, [user, authLoading]);

  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    fetchMyBookings(); 
  };

  const handleCancelBooking = () => {
    if (!cancelBooking) return;

    axiosSecure.delete(`/bookings/${cancelBooking._id}`)
      .then(res => {
        if (res.data.deletedCount > 0) {
          toast.success("Booking cancelled successfully!");
          fetchMyBookings();
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to cancel booking");
      })
      .finally(() => {
        cancelModalRef.current?.close();
        setCancelBooking(null);
      });
  };

  const openCancelModal = (booking) => {
    setCancelBooking(booking);
    cancelModalRef.current?.showModal();
  };

  const fallbackImage = "https://i.ibb.co/0s3pdnc/avatar.png";

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
                <figure className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={
                        item.serviceImg || 
                        item.image || 
                        item.img || 
                        item.service?.image || 
                        fallbackImage
                    }
                    alt={item.serviceName || "Service"}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => { 
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                    }}
                  />
                </figure>

                <div className="card-body p-6">
                  <h3 className="card-title text-xl font-bold text-base-content">
                    {item.service_name || item.serviceName || "Unknown Service"}
                  </h3>

                  <div className="space-y-3 mt-4 text-base">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-primary" />
                      <span>
                        {item.bookingDate ? new Date(item.bookingDate).toLocaleDateString('en-GB') : "Date N/A"}
                      </span>
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

                  <div className="flex gap-3 mt-6">
                    {item.paymentStatus !== "paid" && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedBooking(item);
                            setIsModalOpen(true);
                          }}
                          className="btn btn-primary flex-1 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                          Pay Now
                        </button>

                        <button
                          onClick={() => openCancelModal(item)}
                          className="btn btn-error btn-outline flex-1 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                          <FaTrashAlt /> Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Existing Payment Modal */}
        <PaymentModal
          isOpen={isModalOpen}
          onClose={handlePaymentSuccess}
          amount={selectedBooking?.cost || selectedBooking?.price}
          bookingId={selectedBooking?._id} 
        />

        {/* Beautiful Cancel Confirmation Modal - Fully styled for light & dark theme */}
        <dialog ref={cancelModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 border border-base-300 shadow-2xl max-w-md w-full">
            {/* Header with warning icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error/10 mb-6">
                <FaExclamationTriangle className="w-12 h-12 text-error" />
              </div>
              <h3 className="text-3xl font-extrabold text-base-content">Cancel Booking?</h3>
              <p className="mt-4 text-base-content/70 text-lg">
                This action cannot be undone.
              </p>
            </div>

            {/* Booking details summary */}
            {cancelBooking && (
              <div className="bg-base-200 rounded-2xl p-6 space-y-4 mb-8 border border-base-300">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-base-content/80">Service:</span>
                  <span className="font-bold text-base-content">
                    {cancelBooking.service_name || cancelBooking.serviceName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-base-content/80">Date:</span>
                  <span className="font-bold text-base-content">
                    {cancelBooking.bookingDate 
                      ? new Date(cancelBooking.bookingDate).toLocaleDateString('en-GB') 
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-base-content/80">Amount:</span>
                  <span className="font-bold text-xl text-primary">
                    ৳{(cancelBooking.cost || cancelBooking.price || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="modal-action flex gap-4">
              <form method="dialog" className="flex-1">
                <button className="btn btn-ghost btn-lg w-full rounded-2xl font-bold text-base-content/80 hover:bg-base-200">
                  No, Keep Booking
                </button>
              </form>
              <button
                onClick={handleCancelBooking}
                className="btn btn-error btn-lg flex-1 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>

          {/* Click outside to close */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default MyBookings;