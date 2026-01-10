import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion"; // ১. এই লাইনটি মিসিং ছিল

const Services = () => {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const servicesPerPage = 6;
  const pagesVisited = pageNumber * servicesPerPage;

  useEffect(() => {
  axios.get(`https://style-decor-server.onrender.com/services`)
      .then(res => {
        
        if (Array.isArray(res.data)) {
            setServices(res.data);
            setFiltered(res.data);
        } else {
            console.error("API Error: Data is not an array", res.data);
            setServices([]);
            setFiltered([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false); 
      });
  }, []);

  // Filter Logic
 useEffect(() => {
  if (!Array.isArray(services)) return;

  let temp = [...services];

  if (search) {
    temp = temp.filter(s => 
      s.service_name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category !== "all") {
    temp = temp.filter(s => 
      s.category?.toLowerCase() === category.toLowerCase()  // ← এটা চেঞ্জ
    );
  }

  if (minPrice) temp = temp.filter(s => s.cost >= Number(minPrice));
  if (maxPrice) temp = temp.filter(s => s.cost <= Number(maxPrice));

  setFiltered(temp);
  setPageNumber(0);
}, [search, category, minPrice, maxPrice, services]);

 
  const displayServices = Array.isArray(filtered) && filtered.length > 0 
    ? filtered
        .slice(pagesVisited, pagesVisited + servicesPerPage)
        .map(service => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <figure className="h-64 overflow-hidden">
              <img 
                src={service.image || "https://i.ibb.co/0s3pdnc/avatar.png"} 
                alt={service.service_name}
                className="w-full h-full object-cover hover:scale-110 transition"
              />
            </figure>
            <div className="card-body">
              <div className="badge badge-secondary badge-outline">{service.category}</div>
              <h2 className="card-title text-2xl">{service.service_name}</h2>
              <p className="text-base-content/70">{service.description?.slice(0,100)}...</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-2xl font-bold text-primary">
                  ৳{service.cost} <span className="text-sm font-normal">/{service.unit}</span>
                </p>
                <Link to={`/services/${service._id}`} className="btn btn-primary btn-sm rounded-full">
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))
    : [];

  const pageCount = Math.ceil((filtered?.length || 0) / servicesPerPage);
  const changePage = ({ selected }) => setPageNumber(selected);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  return (
    <div className="min-h-screen py-24 px-6 bg-base-100">
      <div className="container mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-12">
          Our Decoration Services
        </h1>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-5xl mx-auto">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search service name..."
              className="input input-bordered w-full pl-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select className="select select-bordered w-full md:w-64" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="home">Home</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate</option>
            <option value="birthday">Birthday</option>
          </select>

          <input type="number" placeholder="Min Price" className="input input-bordered w-32" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
          <input type="number" placeholder="Max Price" className="input input-bordered w-32" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        </div>

        {/* Grid */}
        {filtered && filtered.length === 0 ? (
          <p className="text-center text-2xl text-gray-500 mt-20">No services found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices}
          </div>
        )}

        {/* Pagination */}
        {filtered && filtered.length > servicesPerPage && (
          <div className="flex justify-center mt-12">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination flex gap-2"}
              pageClassName={"btn btn-outline"}
              previousClassName={"btn btn-outline"}
              nextClassName={"btn btn-outline"}
              activeClassName={"btn btn-primary"}
              disabledClassName={"btn-disabled"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;