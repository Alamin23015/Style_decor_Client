// উপরে লিখে দে (একবারই)
const baseUrl = import.meta.env.VITE_SERVER_URL || "https://style-decor-server-production.up.railway.app";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

// Pages
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import ServiceDetails from "./pages/Services/ServiceDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Dashboard Pages
import MyBookings from "./pages/Dashboard/User/MyBookings";
import ManageServices from "./pages/Dashboard/Admin/ManageServices";  
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard"; 
import AllBookings from "./pages/Dashboard/Admin/AllBookings";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";

// Routes
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";  // এটা থাকতেই হবে

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Private Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* User Routes */}
        <Route index element={<MyBookings />} />
        
        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="admin/services"
          element={
            <AdminRoute>
              <ManageServices />   {/* এখানে যোগ করলাম */}
            </AdminRoute>
          }
        />
        <Route
  path="admin/bookings"
  element={
    <AdminRoute>
      <AllBookings />
    </AdminRoute>
  }
/>
<Route
  path="admin/users"
  element={
    <AdminRoute>
      <ManageUsers />
    </AdminRoute>
  }
/>
      </Route>
    </Routes>
  );
}

export default App;