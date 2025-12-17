import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import { format } from "date-fns";
import { toast } from "react-toastify";
import { 
    FaUserTie, FaCalendarAlt, FaMapMarkerAlt, 
    FaSearch, FaSortAmountDown, FaMoneyBillWave, FaFilter, FaLock 
} from "react-icons/fa";

const AllBookings = () => {
    const axiosSecure = useAxiosSecure(); 
    const [bookings, setBookings] = useState([]);
    const [decorators, setDecorators] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest"); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
     
            const [bookingsRes, usersRes] = await Promise.all([
                axiosSecure.get("/admin/bookings"),
                axiosSecure.get("/admin/users")
            ]);
            
            const decoratorList = usersRes.data.filter(u => u.role === 'decorator');
            
            setBookings(bookingsRes.data);
            setDecorators(decoratorList);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load data. Please login again.");
            setLoading(false);
        }
    };

    const handleAssign = async (booking, decoratorEmail) => {
        if (booking.paymentStatus !== 'paid') {
            return toast.error("Cannot assign decorator until payment is completed!");
        }

        if (!decoratorEmail) return toast.warning("Please select a decorator first!");

        try {
            const res = await axiosSecure.patch(`/bookings/assign/${booking._id}`, {
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
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="text-4xl font-black text-base-content tracking-tight">Manage Bookings</h2>
                    <p className="opacity-60 mt-1">Assign decorators to paid projects</p>
                </div>
                <div className="badge badge-primary p-4 font-bold">Total: {bookings.length}</div>
            </div>

            {/* Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-base-100 p-4 rounded-2xl shadow-sm">
                <div className="relative col-span-1 md:col-span-2">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                    <input 
                        type="text" 
                        placeholder="Search service or customer..." 
                        className="input input-bordered w-full pl-12 focus:outline-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 px-2">
                    <FaFilter className="text-primary" />
                    <select className="select select-ghost w-full focus:outline-none font-semibold" onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 px-2">
                    <FaSortAmountDown className="text-primary" />
                    <select className="select select-ghost w-full focus:outline-none font-semibold" onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200/50">
                            <tr className="text-xs uppercase opacity-60">
                                <th className="py-6 pl-8">Service & Customer</th>
                                <th>Booking Schedule</th>
                                <th>Payment & Progress</th>
                                <th className="text-center pr-8">Decorator Assignment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedBookings.map((b) => (
                                <tr key={b._id} className="hover:bg-base-200/50 transition-all border-b border-base-200">
                                    <td className="py-6 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar placeholder">
                                                <div className="bg-primary text-primary-content rounded-2xl w-12 h-12 font-bold">
                                                    {(b.customerName || 'C')[0]}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{b.service_name || b.serviceName}</div>
                                                <div className="text-xs opacity-60">{b.customerName || 'Guest'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm">
                                            <div className="flex items-center gap-1 font-medium">
                                                <FaCalendarAlt className="text-primary text-xs" /> {b.bookingDate ? format(new Date(b.bookingDate), "dd MMM, yyyy") : "N/A"}
                                            </div>
                                            <div className="text-xs opacity-50 mt-1">{b.location || "Location N/A"}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold text-lg">৳{(b.cost || 0).toLocaleString()}</div>
                                        <div className="flex gap-2 mt-1">
                                            <span className={`badge badge-xs p-2 ${b.paymentStatus === 'paid' ? 'badge-success' : 'badge-error'} text-white font-bold`}>
                                                {b.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                            </span>
                                            <span className="badge badge-xs p-2 badge-outline font-bold uppercase text-[9px]">{b.status}</span>
                                        </div>
                                    </td>
                                    <td className="pr-8">
                                        {b.paymentStatus !== 'paid' ? (
                                            <div className="flex flex-col items-center gap-1 opacity-40">
                                                <FaLock />
                                                <span className="text-[10px] font-bold uppercase">Wait for Payment</span>
                                            </div>
                                        ) : b.decoratorEmail ? (
                                            <div className="bg-success/10 text-success p-3 rounded-2xl text-center">
                                                <p className="text-[9px] font-black uppercase">Assigned To</p>
                                                <p className="text-xs font-bold truncate">{b.decoratorEmail}</p>
                                            </div>
                                        ) : (
                                            <div className="join w-full shadow-sm">
                                                <select 
                                                    className="select select-bordered select-sm join-item bg-base-100 text-xs w-full"
                                                    defaultValue=""
                                                    id={`select-${b._id}`}
                                                >
                                                    <option disabled value="">Choose Decorator</option>
                                                    {decorators.map(d => (
                                                        <option key={d._id} value={d.email}>{d.name || d.email}</option>
                                                    ))}
                                                </select>
                                                <button 
                                                    onClick={() => handleAssign(b, document.getElementById(`select-${b._id}`).value)}
                                                    className="btn btn-primary btn-sm join-item"
                                                >
                                                    Assign
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination UI - Challenge Requirement 4 */}
            <div className="flex justify-center mt-10 join">
                <button className="join-item btn btn-outline btn-sm">Previous</button>
                <button className="join-item btn btn-primary btn-sm">1</button>
                <button className="join-item btn btn-outline btn-sm">Next</button>
            </div>
        </div>
    );
};

export default AllBookings;