import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaServicestack, FaChartLine, FaWallet } from "react-icons/fa";
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie 
} from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalServices: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [bookingsRes, usersRes, servicesRes] = await Promise.all([
          axiosSecure.get('/admin/bookings'),
          axiosSecure.get('/admin/users'),
          axiosSecure.get('/services')
        ]);

        const bookings = bookingsRes.data;
        const users = usersRes.data;
        const services = servicesRes.data;

        const revenue = bookings.reduce((sum, booking) => sum + parseInt(booking.cost || 0), 0);
        
        setStats({
          totalServices: services.length,
          totalUsers: users.length,
          totalBookings: bookings.length,
          totalRevenue: revenue
        });

        const serviceCount = {};
        bookings.forEach(booking => {
            const name = booking.service_name || "Others";
            serviceCount[name] = (serviceCount[name] || 0) + 1;
        });

        const formattedBarData = Object.keys(serviceCount).map(key => ({
            name: key.length > 10 ? key.slice(0, 10) + '..' : key,
            bookings: serviceCount[key]
        }));
        setChartData(formattedBarData);

        const paidCount = bookings.filter(b => b.paymentStatus === 'paid').length;
        const unpaidCount = bookings.length - paidCount;
        
        setPieData([
            { name: 'Paid', value: paidCount },
            { name: 'Unpaid', value: unpaidCount }
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-serif font-bold">Admin Dashboard</h2>
        <p className="mt-2 opacity-90 text-lg">
          Welcome back, {user?.displayName}. Here is your business overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-base-100 shadow-md rounded-xl border border-base-200">
          <div className="stat-figure text-primary">
            <FaServicestack className="text-3xl" />
          </div>
          <div className="stat-title">Total Services</div>
          <div className="stat-value text-primary">{stats.totalServices}</div>
          <div className="stat-desc">Available for booking</div>
        </div>

        <div className="stat bg-base-100 shadow-md rounded-xl border border-base-200">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-secondary">{stats.totalUsers}</div>
          <div className="stat-desc">Registered users</div>
        </div>

        <div className="stat bg-base-100 shadow-md rounded-xl border border-base-200">
          <div className="stat-figure text-accent">
            <FaChartLine className="text-3xl" />
          </div>
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value text-accent">{stats.totalBookings}</div>
          <div className="stat-desc">All time orders</div>
        </div>

        <div className="stat bg-base-100 shadow-md rounded-xl border border-base-200">
            <div className="stat-figure text-warning">
                <FaWallet className="text-3xl" />
            </div>
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value text-warning text-2xl">৳{stats.totalRevenue}</div>
            <div className="stat-desc">Estimated earnings</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
              <h3 className="text-xl font-bold mb-6 text-center text-gray-700">Service Booking Demand</h3>
              <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="bookings" fill="#8884d8">
                              {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                              ))}
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
              <h3 className="text-xl font-bold mb-6 text-center text-gray-700">Payment Status Overview</h3>
              <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label
                          >
                              {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={index === 0 ? '#00C49F' : '#FF8042'} />
                              ))}
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

export default AdminDashboard;