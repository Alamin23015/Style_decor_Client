// src/pages/Services/ServiceDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import PaymentModal from "../../components/PaymentModal";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [location, setLocation] = useState("");
  const [showPayment, setShowPayment] = useState(false);

 const baseUrl = import.meta.env.VITE_SERVER_URL || "https://style-decor-server-production.up.railway.app"; 
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.get(`${baseUrl}/services/${id}`)
      .then(res => {
        setService(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, baseUrl]);

  const handleBooking = () => {
    if (!user) {
      toast.info("Please login to book");
      navigate("/login", { state: { from: `/services/${id}` } });
      return;
    }
    setModalOpen(true);
  };

  const confirmBooking = () => {
    const bookingData = {
      serviceId: service._id,
      serviceName: service.service_name,
      serviceImg: service.img,
      cost: service.cost,
      unit: service.unit,
      customerName: user.displayName,
      email: user.email,
      customerPhoto: user.photoURL,
      bookingDate,
      location,
      status: "pending",
      bookedAt: new Date()
    };

    axios.post(`${baseUrl}/bookings`, bookingData)
      .then(res => {
        if (res.data.insertedId) {
          toast.success("Booking successful! Admin will contact you soon.");
          setModalOpen(false);
          setBookingDate("");
          setLocation("");
          setShowPayment(true);
        }
      })
      .catch(() => toast.error("Booking failed"));
  };

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!service) return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="text-center py-20 text-3xl text-error font-semibold">Service not found</div>
    </div>
  );

  const serviceName = service.service_name || "Unknown Service";
  const serviceImg = service.img || "https://i.ibb.co/0s3pdnc/avatar.png";
  const serviceCost = service.cost || 0;
  const serviceUnit = service.unit || "event";
  const serviceDesc = service.description || "No description available.";
  const serviceCategory = service.category || "General";

  return (
    <div className="min-h-screen py-28 px-6 bg-base-200">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto lg:min-h-[600px] overflow-hidden">
              <img 
                src={serviceImg} 
                alt={serviceName} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-6 left-6">
                <div className="badge badge-primary badge-lg text-white font-semibold px-4 py-3 shadow-md capitalize">
                  {serviceCategory}
                </div>
              </div>
            </div>

            <div className="p-10 lg:p-16 flex flex-col justify-center bg-base-100">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-8 text-base-content leading-tight">
                {serviceName}
              </h1>
              
              <div className="divider mb-8"></div>

              <p className="text-xl text-base-content/80 mb-10 leading-relaxed">
                {serviceDesc}
              </p>

              <div className="flex items-center mb-12">
                <span className="text-2xl font-semibold mr-2 text-base-content/70">Price:</span>
                <div className="text-5xl font-extrabold text-primary">
                  ৳{serviceCost} <span className="text-xl font-medium text-base-content/60">/{serviceUnit}</span>
                </div>
              </div>

              <button onClick={handleBooking} className="btn btn-primary btn-lg rounded-full w-full text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle bg-black/60 backdrop-blur-sm">
          <div className="modal-box p-8 rounded-2xl shadow-2xl">
            <h3 className="font-bold text-3xl mb-8 text-center">Confirm Your Booking</h3>
            
            <div className="space-y-6">
              <div>
                <label className="label font-semibold text-lg">Service</label>
                <input type="text" value={serviceName} disabled className="input input-bordered input-lg w-full bg-base-200 font-semibold" />
              </div>

              <div>
                <label className="label font-semibold text-lg">Preferred Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={today}
                  className="input input-bordered input-lg w-full focus:input-primary"
                  required
                />
              </div>
              <div>
                <label className="label font-semibold text-lg">Location / Address</label>
                <textarea
                  placeholder="House no, Road, Area, Dhaka"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="textarea textarea-bordered textarea-lg w-full h-32 focus:textarea-primary resize-none"
                  required
                />
              </div>
            </div>

            <div className="modal-action mt-10 flex justify-end gap-4">
              <button onClick={() => setModalOpen(false)} className="btn btn-ghost btn-lg font-semibold">Cancel</button>
              <button onClick={confirmBooking} className="btn btn-primary btn-lg px-8 font-bold shadow-md">Confirm Booking</button>
            </div>
          </div>
        </dialog>
      )}

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        amount={serviceCost} 
      />
    </div>
  );
};

export default ServiceDetails;