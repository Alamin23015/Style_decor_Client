import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // axiosSecure-er poriborte shadharon axios use koro home page-e
import useAxiosSecure from "../../hooks/useAxiosSecure";
const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    axios.get(`https://style-decor-server.onrender.com/services`) 
      .then((res) => {
        console.log("Fetched Services Data:", res.data); // Console-e dekho image link ashche kina
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Our <span className="text-primary">Featured Services</span>
        </h2>
        <p className="text-base-content/70">Top rated decoration packages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.slice(0, 6).map((service, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card bg-base-100 shadow-xl border border-base-200 group overflow-hidden"
          >
            <figure className="h-52 overflow-hidden">
              <img
                src={service.image} // Database-er field name 'image' thakle eta thik ache
                alt={service.service_name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found"; // Image load na hole placeholder dekhabe
                }}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">{service.service_name}</h3>
              <p className="text-lg font-bold text-primary">{service.cost} BDT</p>
              <div className="card-actions justify-end">
                <Link to={`/services/${service._id}`} className="btn btn-sm btn-outline btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/services" className="btn btn-primary btn-wide rounded-full">
          Explore All Services
        </Link>
      </div>
    </div>
  );
};

export default FeaturedServices;