import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
// 🔥 axios এর বদলে useAxiosSecure ইমপোর্ট করা হয়েছে
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";

const Schedule = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure(); // 🔥 axiosSecure ইনিশিয়ালাইজ করা হয়েছে
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        if (user?.email) {
            // 🔥 axiosSecure ব্যবহার করা হয়েছে যাতে টোকেন অটোমেটিক যায়
            axiosSecure.get(`/bookings/decorator/${user.email}`)
                .then(res => {
                    // আপনার অরিজিনাল তারিখ অনুযায়ী সর্ট করার লজিক হুবহু রাখা হয়েছে
                    const sortedData = res.data.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
                    setSchedules(sortedData);
                })
                .catch(err => {
                    console.error("Schedule load error:", err);
                });
        }
    }, [user, axiosSecure]); // dependency তে axiosSecure যোগ করা হয়েছে

    return (
        <div className="p-8 bg-base-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-primary flex items-center gap-2">
                <FaCalendarAlt /> My Work Schedule
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-primary text-white text-lg">
                        <tr>
                            <th>Date</th>
                            <th>Service</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((item) => (
                            <tr key={item._id}>
                                <td className="font-bold text-lg">
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-secondary" />
                                        {new Date(item.bookingDate || item.date).toDateString()}
                                    </div>
                                </td>
                                <td className="font-medium">{item.service_name || item.serviceName}</td>
                                <td>{item.location}</td>
                                <td>
                                    {item.status === 'Completed' ? (
                                        <span className="badge badge-success gap-2 text-white">
                                            <FaCheckCircle /> Done
                                        </span>
                                    ) : (
                                        <span className="badge badge-info text-white">{item.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {schedules.length === 0 && (
                <div className="text-center mt-10 text-gray-400">
                    <p>No upcoming schedule found.</p>
                </div>
            )}
        </div>
    );
};

export default Schedule;