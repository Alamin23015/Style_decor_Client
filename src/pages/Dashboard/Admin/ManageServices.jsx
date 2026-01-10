import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa";

// আপনার ব্যাকেন্ড URL
const baseUrl = import.meta.env.VITE_SERVER_URL || "https://style-decor-server.onrender.com";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "",
    cost: "",
    unit: "",
    category: "wedding",
    description: "",
    img: ""
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${baseUrl}/services`);
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  // --- পরিবর্তিত handleSubmit ফাংশন ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // টোকেন সংগ্রহ (লগইন করার সময় আপনি এটি সেভ করেছিলেন)
    const token = localStorage.getItem('access-token'); 

    const url = editing 
      ? `${baseUrl}/services/${editing._id}` 
      : `${baseUrl}/services`;
    const method = editing ? "put" : "post";

    try {
      // হেডারসহ এক্সিওস কল
      await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      toast.success(editing ? "Service updated successfully!" : "New service added!");
      closeModal();
      fetchServices();
    } catch (err) {
      console.error("Error response:", err.response?.data);
      toast.error(err.response?.data?.message || "Operation failed. Please try again.");
    }
  };

  // --- পরিবর্তিত handleDelete ফাংশন ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    
    const token = localStorage.getItem('access-token');

    try {
      await axios.delete(`${baseUrl}/services/${id}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      toast.success("Service deleted");
      fetchServices();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const openEditModal = (service) => {
    setEditing(service);
    setFormData({
      service_name: service.service_name,
      cost: service.cost,
      unit: service.unit,
      category: service.category,
      description: service.description,
      img: service.img
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({
      service_name: "", cost: "", unit: "", category: "wedding", description: "", img: ""
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary">
            Manage Services
          </h1>
          <p className="mt-3 text-lg text-base-content/70">
            Total Services: <span className="font-semibold text-primary">{services.length}</span>
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary btn-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 hover:scale-105"
          >
            <FaPlus className="text-xl" />
            <span className="font-medium">Add New Service</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="group relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-base-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.img || "https://i.ibb.co/0s3pdnc/avatar.png"}
                  alt={service.service_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary badge-lg font-medium shadow-lg">
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold font-serif text-primary">
                  {service.service_name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-secondary">৳{service.cost}</span>
                  <span className="text-sm text-base-content/60">/{service.unit}</span>
                </div>
                <p className="text-base-content/80 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex gap-3 pt-4 border-t border-base-300">
                  <button onClick={() => openEditModal(service)} className="flex-1 btn btn-outline btn-warning btn-sm">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDelete(service._id)} className="flex-1 btn btn-outline btn-error btn-sm">
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
              <h2 className="text-3xl font-bold font-serif text-center">
                {editing ? "Update Service" : "Add New Service"}
              </h2>
              <button onClick={closeModal} className="absolute top-4 right-4 btn btn-circle btn-ghost text-white">
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Service Name</span></label>
                  <input type="text" required value={formData.service_name} onChange={(e) => setFormData({ ...formData, service_name: e.target.value })} className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Category</span></label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="select select-bordered w-full">
                    <option value="wedding">Wedding</option>
                    <option value="home">Home Decor</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Cost (৳)</span></label>
                  <input type="number" required value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: e.target.value })} className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Unit</span></label>
                  <input type="text" required value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="input input-bordered w-full" />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="label"><span className="label-text font-semibold">Image URL</span></label>
                  <input type="url" required value={formData.img} onChange={(e) => setFormData({ ...formData, img: e.target.value })} className="input input-bordered w-full" />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="label"><span className="label-text font-semibold">Description</span></label>
                  <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="textarea textarea-bordered w-full" />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6 border-t border-base-300">
                <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary px-10">
                  {editing ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;