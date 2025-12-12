import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { 
    FaUserTie, FaCalendarAlt, FaMapMarkerAlt, 
    FaSearch, FaSortAmountDown, FaMoneyBillWave, FaFilter 
} from "react-icons/fa";

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [decorators, setDecorators] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest"); 

    const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

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

    const handleAssign = async (bookingId, decoratorEmail) => {
        if (!decoratorEmail) return toast.warning("Please select a decorator first!");

        try {
            const res = await axios.patch(`${baseUrl}/bookings/assign/${bookingId}`, {
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
        <div className="p-4 md:p-8 bg-base-200 min-h-screen">
           
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Admin: Manage Bookings</h2>
                <p className="text-gray-500">Monitor all decoration requests and manage assignments</p>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
               
                <div className="relative col-span-1 md:col-span-2">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by service or customer..." 
                        className="input input-bordered w-full pl-10 focus:outline-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                
                <div className="flex items-center gap-2 bg-white px-3 rounded-lg border">
                    <FaFilter className="text-primary" />
                    <select 
                        className="select select-ghost w-full focus:outline-none"
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                
                <div className="flex items-center gap-2 bg-white px-3 rounded-lg border">
                    <FaSortAmountDown className="text-primary" />
                    <select 
                        className="select select-ghost w-full focus:outline-none"
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>


            <div className="card bg-base-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="py-4">Service & Customer</th>
                                <th className="py-4">Schedule</th>
                                <th className="py-4">Payment & Work Status</th>
                                <th className="py-4 text-center">Assign Decorator</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-20 text-gray-400">
                                        No bookings found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredAndSortedBookings.map((b) => (
                                    <tr key={b._id} className="hover:bg-gray-50 transition border-b">
                                        
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary/10 text-primary rounded-full w-10">
                                                        <span className="text-xs font-bold">{(b.customerName || 'C')[0]}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{b.service_name || b.serviceName}</div>
                                                    <div className="text-xs opacity-60">{b.customerName || 'Unknown User'}</div>
                                                    <div className="text-[10px] text-primary">{b.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                     
                                        <td className="py-4">
                                            <div className="flex flex-col gap-1 text-sm">
                                                <span className="flex items-center gap-1 text-gray-600">
                                                    <FaCalendarAlt className="text-xs" /> {b.bookingDate ? format(new Date(b.bookingDate), "dd MMM, yyyy") : "N/A"}
                                                </span>
                                                <span className="flex items-center gap-1 text-gray-500">
                                                    <FaMapMarkerAlt className="text-xs" /> 
                                                    <span className="truncate max-w-[150px]">{b.location || b.address || "No Location"}</span>
                                                </span>
                                            </div>
                                        </td>

                                       
                                        <td className="py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold flex items-center gap-1">
                                                    <FaMoneyBillWave className="text-green-600" /> ৳{b.cost || b.price}
                                                </span>
                                                <div className="flex gap-1">
                                                    <span className={`badge badge-xs p-2 ${b.paymentStatus === 'paid' ? 'badge-success' : 'badge-ghost'}`}>
                                                        {b.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                                    </span>
                                                    <span className={`badge badge-xs p-2 badge-outline font-bold`}>
                                                        {b.status || 'Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        
                                        <td className="py-4">
                                            {b.decoratorEmail ? (
                                                <div className="bg-success/10 text-success p-2 rounded text-center border border-success/20">
                                                    <p className="text-[10px] font-bold uppercase">Assigned to:</p>
                                                    <p className="text-xs truncate">{b.decoratorEmail}</p>
                                                </div>
                                            ) : (
                                                <div className="join w-full justify-center">
                                                    <select 
                                                        className="select select-bordered select-sm join-item bg-base-100 focus:outline-none"
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
                                                            handleAssign(b._id, email);
                                                        }}
                                                        className="btn btn-primary btn-sm join-item"
                                                    >
                                                        Assign
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllBookings;