import { useEffect, useState } from "react";
// 🔥 useAxiosSecure হুকটি ইমপোর্ট করা হয়েছে
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { 
    FaMapMarkerAlt, FaCalendarAlt, FaUser, 
    FaWallet, FaCheckCircle, FaClock, FaHistory, FaArrowRight 
} from "react-icons/fa";

const MyProjects = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure(); // 🔥 axios এর বদলে axiosSecure ইনিশিয়ালাইজ করা হয়েছে
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusSteps = [
        "Assigned", "Planning Phase", "Materials Prepared", 
        "On the Way to Venue", "Setup in Progress", "Completed"
    ];

    useEffect(() => {
        // ইউজার লোড হওয়ার পর এবং ইমেইল থাকলে ডাটা ফেচ হবে
        if (!authLoading && user?.email) {
            // 🔥 axiosSecure ব্যবহার করায় baseUrl আর আলাদাভাবে দেওয়া লাগবেনা
            axiosSecure.get(`/bookings/decorator/${user.email}`)
                .then(res => {
                    setProjects(res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user, authLoading, axiosSecure]);

    const activeProjects = projects.filter(p => p.status !== 'Completed');
    const completedProjects = projects.filter(p => p.status === 'Completed');
    const totalEarnings = completedProjects.reduce((sum, p) => sum + (parseFloat(p.cost || p.price) || 0), 0);
    const todayStr = new Date().toLocaleDateString();
    const todaysTasks = projects.filter(p => p.bookingDate && new Date(p.bookingDate).toLocaleDateString() === todayStr);

    const handleStatusUpdate = (id, newStatus) => {
        // 🔥 এখানেও axiosSecure ব্যবহার করা হয়েছে টোকেন পাঠানোর জন্য
        axiosSecure.patch(`/bookings/status/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success(`Status: ${newStatus}`);
                    setProjects(projects.map(p => p._id === id ? { ...p, status: newStatus } : p));
                }
            });
    };

    if (loading || authLoading) return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <span className="loading loading-infinity loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-10 bg-base-200/50 min-h-screen text-base-content transition-colors duration-300">
            
            {/* --- Premium Stats Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="stats shadow-lg bg-base-100 border-b-4 border-primary overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-primary opacity-30"><FaWallet size={40} /></div>
                        <div className="stat-title font-bold uppercase text-[10px] tracking-widest">Total Earnings</div>
                        <div className="stat-value text-primary text-3xl">৳{totalEarnings.toLocaleString()}</div>
                        <div className="stat-desc text-base-content/60">From {completedProjects.length} projects</div>
                    </div>
                </div>

                <div className="stats shadow-lg bg-base-100 border-b-4 border-secondary overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-secondary opacity-30"><FaClock size={40} /></div>
                        <div className="stat-title font-bold uppercase text-[10px] tracking-widest">Today's Schedule</div>
                        <div className="stat-value text-secondary text-3xl">{todaysTasks.length}</div>
                        <div className="stat-desc">{todaysTasks.length > 0 ? "Action required today" : "Relax, no tasks today"}</div>
                    </div>
                </div>

                <div className="stats shadow-lg bg-base-100 border-b-4 border-accent overflow-hidden">
                    <div className="stat">
                        <div className="stat-figure text-accent opacity-30"><FaCheckCircle size={40} /></div>
                        <div className="stat-title font-bold uppercase text-[10px] tracking-widest">Active Projects</div>
                        <div className="stat-value text-accent text-3xl">{activeProjects.length}</div>
                        <div className="stat-desc">Ongoing decorations</div>
                    </div>
                </div>
            </div>

            {/* --- Active Projects Header --- */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black flex items-center gap-3">
                    <span className="p-2 bg-primary rounded-xl text-white shadow-lg shadow-primary/20"><FaArrowRight size={18} /></span>
                    Active Workload
                </h2>
                <div className="badge badge-outline badge-lg opacity-50 px-4 py-4">{activeProjects.length} Projects Pending</div>
            </div>

            {activeProjects.length === 0 ? (
                <div className="card bg-base-100 p-20 text-center shadow-inner opacity-60">
                    <p className="text-xl italic">No active projects assigned to you.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
                    {activeProjects.map((item) => (
                        <div key={item._id} className="group card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300/50 overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className={`badge badge-md font-bold px-4 py-3 ${item.paymentStatus === 'paid' ? 'badge-success' : 'badge-ghost text-error'}`}>
                                    {item.paymentStatus === 'paid' ? 'PAID' : 'UNPAID'}
                                </span>
                            </div>

                            <div className="card-body p-8">
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    <div className="p-6 bg-primary/10 rounded-3xl border border-primary/20 flex flex-col items-center justify-center">
                                        <p className="text-[10px] font-black opacity-50 uppercase">Cost</p>
                                        <p className="text-2xl font-black text-primary">৳{item.cost}</p>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black text-base-content group-hover:text-primary transition-colors">{item.service_name || item.serviceName}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-4 text-sm opacity-80 font-medium">
                                            <p className="flex items-center gap-2"><FaUser className="text-primary"/> {item.customerName}</p>
                                            <p className="flex items-center gap-2"><FaCalendarAlt className="text-primary"/> {new Date(item.bookingDate).toDateString()}</p>
                                            <p className="flex items-center gap-2 md:col-span-2"><FaMapMarkerAlt className="text-primary"/> {item.location || item.address}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="divider opacity-30 my-6"></div>

                                {/* Modern Status Stepper Indicator (Visual only) */}
                                <div className="w-full bg-base-200 rounded-full h-1.5 mb-6">
                                    <div className="bg-primary h-1.5 rounded-full transition-all duration-1000" style={{ width: `${((statusSteps.indexOf(item.status) + 1) / statusSteps.length) * 100}%` }}></div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="text-xs font-bold opacity-40 uppercase tracking-widest">Current Phase: <span className="text-primary">{item.status}</span></div>
                                    <select 
                                        className="select select-bordered select-sm w-full md:w-auto bg-base-200 focus:outline-primary border-none font-bold"
                                        defaultValue={item.status}
                                        onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                                    >
                                        {statusSteps.map(step => (
                                            <option key={step} value={step}>{step}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- History Section --- */}
            {completedProjects.length > 0 && (
                <>
                    <div className="divider opacity-20 mb-12">COMPLETED HISTORY</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {completedProjects.map((item) => (
                            <div key={item._id} className="card bg-base-100 shadow-lg p-6 border-l-4 border-success hover:scale-105 transition-transform">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-black text-lg">{item.service_name}</h4>
                                        <p className="text-xs opacity-50 mt-1">Completed on: {new Date(item.bookingDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="p-2 bg-success/20 text-success rounded-lg"><FaCheckCircle /></div>
                                </div>
                                <div className="mt-4 text-xl font-black text-success">৳{item.cost}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyProjects;