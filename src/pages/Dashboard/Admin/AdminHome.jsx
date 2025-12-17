import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [bookings, setBookings] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // সব বুকিং ডাটা নিয়ে আসা হচ্ছে
        axiosSecure.get('/admin/bookings')
            .then(res => {
                setBookings(res.data);
                
                // ডাটা প্রসেসিং: কোন সার্ভিস কতবার বুক হয়েছে
                const serviceCount = {};
                res.data.forEach(booking => {
                    const name = booking.service_name || "Unknown";
                    serviceCount[name] = (serviceCount[name] || 0) + 1;
                });

                // Recharts এর জন্য ডাটা ফরম্যাট করা
                const formattedData = Object.keys(serviceCount).map(key => ({
                    name: key.length > 15 ? key.slice(0, 15) + '...' : key, // নাম বেশি বড় হলে ছোট করা
                    bookings: serviceCount[key]
                }));

                setChartData(formattedData);
            });
    }, [axiosSecure]);

    // কাস্টম কালার (Bar Chart এর জন্য)
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Dashboard Analytics</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="stat bg-primary text-primary-content rounded-xl shadow-lg">
                    <div className="stat-title text-white/80">Total Bookings</div>
                    <div className="stat-value">{bookings.length}</div>
                </div>
                <div className="stat bg-secondary text-secondary-content rounded-xl shadow-lg">
                    <div className="stat-title text-white/80">Total Revenue</div>
                    <div className="stat-value">
                        ৳{bookings.reduce((total, b) => total + parseInt(b.cost || 0), 0).toLocaleString()}
                    </div>
                </div>
                <div className="stat bg-accent text-accent-content rounded-xl shadow-lg">
                    <div className="stat-title text-black/60">Paid Orders</div>
                    <div className="stat-value text-black">
                        {bookings.filter(b => b.paymentStatus === 'paid').length}
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* 1. Service Demand Chart (Bar Chart) */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
                    <h3 className="text-xl font-bold mb-6 text-center">Service Demand Chart</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="bookings" fill="#8884d8">
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Payment Status (Pie Chart) */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
                    <h3 className="text-xl font-bold mb-6 text-center">Payment Status</h3>
                    <div className="h-[300px] w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Paid', value: bookings.filter(b => b.paymentStatus === 'paid').length },
                                        { name: 'Unpaid', value: bookings.filter(b => b.paymentStatus !== 'paid').length }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    <Cell fill="#00C49F" />
                                    <Cell fill="#FF8042" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;