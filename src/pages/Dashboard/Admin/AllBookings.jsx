import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { 
    FaUserTie, FaCalendarAlt, FaMapMarkerAlt, 
    FaSearch, FaSortAmountDown, FaMoneyBillWave, FaFilter, FaLock 
} from "react-icons/fa";

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [decorators, setDecorators] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest"); 

    const baseUrl = import.meta.env.VITE_SERVER_URL || "https://style-decor-server-production.up.railway.app";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [bookingsRes, usersRes] = await Promise.all([
                axios.get(`${baseUrl}/admin/bookings`),
                axios.get(`${baseUrl}/admin/users`)
            ]);
            
            const decoratorList = usersRes.data.filter(u => u.role === 'decorator');
            
            setBookings(bookingsRes.data);
            setDecorators(decoratorList);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load data");
            setLoading(false);
        }
    };

    const handleAssign = async (booking, decoratorEmail) => {
     
        if (booking.paymentStatus !== 'paid') {
            return toast.error("Cannot assign decorator until payment is completed!");
        }

        if (!decoratorEmail) return toast.warning("Please select a decorator first!");

        try {
            const res = await axios.patch(`${baseUrl}/bookings/assign/${booking._id}`, {
                decoratorEmail: decoratorEmail,
                status: 'Assigned'
            });

            if (res.data.modifiedCount > 0) {
                toast.success("Decorator Assigned Successfully!");
                fetchData(); 
            }
        } catch (error) {
            toast.error("Failed to assign decorator");
        }
    };

    const filteredAndSortedBookings = bookings
        .filter(b => {
            const matchesSearch = (b.service_name || b.serviceName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                                (b.customerName || b.email || "").toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === "all" || b.status?.toLowerCase() === filterStatus.toLowerCase();
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            const dateA = new Date(a.bookingDate || 0);
            const dateB = new Date(b.bookingDate || 0);
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-10 bg-base-200 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="text-4xl font-black text-gray-800 tracking-tight">Manage Bookings</h2>
                    <p className="text-gray-500 mt-1">Review, track and assign decorators to projects</p>
                </div>
                <div className="badge badge-primary p-4 font-bold">Total: {bookings.length}</div>
            </div>

            {/* Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative col-span-1 md:col-span-2">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search service, customer or email..." 
                        className="input input-bordered w-full pl-12 bg-gray-50 border-none focus:ring-2 focus:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 px-3">
                    <FaFilter className="text-primary" />
                    <select className="select select-ghost w-full focus:outline-none font-semibold" onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 px-3">
                    <FaSortAmountDown className="text-primary" />
                    <select className="select select-ghost w-full focus:outline-none font-semibold" onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 uppercase text-[11px] tracking-widest">
                                <th className="py-6 pl-8">Service & Customer</th>
                                <th>Booking Schedule</th>
                                <th>Payment & Progress</th>
                                <th className="text-center pr-8">Decorator Assignment</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredAndSortedBookings.map((b) => (
                                <tr key={b._id} className="hover:bg-blue-50/30 transition-all group">
                                    <td className="py-6 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar placeholder">
                                                <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-2xl w-12 h-12 shadow-md">
                                                    <span className="text-lg font-bold">{(b.customerName || 'C')[0]}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 text-base">{b.service_name || b.serviceName}</div>
                                                <div className="text-xs text-gray-400 font-medium">By: {b.customerName || 'Guest'}</div>
                                                <div className="text-[10px] text-blue-500 mt-1 italic">{b.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                                <FaCalendarAlt className="text-primary text-xs" /> 
                                                {b.bookingDate ? format(new Date(b.bookingDate), "dd MMM, yyyy") : "N/A"}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <FaMapMarkerAlt className="text-gray-300" /> 
                                                <span className="truncate max-w-[140px]">{b.location || b.address || "TBA"}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="space-y-2">
                                            <div className="font-bold text-lg text-gray-800 flex items-center gap-1">
                                                <span className="text-xs text-gray-400 font-normal">৳</span>
                                                {(b.cost || b.price || 0).toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter border ${b.paymentStatus === 'paid' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-500 border-red-200'}`}>
                                                    {b.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter bg-gray-100 text-gray-500 border border-gray-200">
                                                    {b.status || 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="pr-8">
                                 
                                        {b.paymentStatus !== 'paid' ? (
                                            <div className="flex flex-col items-center gap-1 opacity-60">
                                                <div className="p-2 bg-gray-100 rounded-full text-gray-400">
                                                    <FaLock className="text-sm" />
                                                </div>
                                                <span className="text-[10px] font-bold text-red-400 uppercase">Wait for Payment</span>
                                            </div>
                                        ) : b.decoratorEmail ? (
                                            <div className="bg-green-50 text-green-700 p-3 rounded-2xl border border-green-100 flex flex-col items-center">
                                                <p className="text-[9px] font-black uppercase opacity-60">Assigned To</p>
                                                <p className="text-xs font-bold truncate max-w-[150px]">{b.decoratorEmail}</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                <div className="join w-full shadow-sm">
                                                    <select 
                                                        className="select select-bordered select-sm join-item bg-white text-xs focus:outline-none border-gray-200"
                                                        defaultValue=""
                                                        id={`select-${b._id}`}
                                                    >
                                                        <option disabled value="">Select Decorator</option>
                                                        {decorators.map(d => (
                                                            <option key={d._id} value={d.email}>{d.name || d.email}</option>
                                                        ))}
                                                    </select>
                                                    <button 
                                                        onClick={() => {
                                                            const email = document.getElementById(`select-${b._id}`).value;
                                                            handleAssign(b, email);
                                                        }}
                                                        className="btn btn-primary btn-sm join-item px-4"
                                                    >
                                                        Assign
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-center text-gray-400 italic">Paid! Ready to assign.</p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllBookings;