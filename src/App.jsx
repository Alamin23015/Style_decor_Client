// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

// Public Pages
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import ServiceDetails from "./pages/Services/ServiceDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// User Pages
import MyBookings from "./pages/Dashboard/User/MyBookings";
import Profile from "./pages/Dashboard/User/Profile";

// Admin Pages
import ManageServices from "./pages/Dashboard/Admin/ManageServices";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import AllBookings from "./pages/Dashboard/Admin/AllBookings";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";

// 🔥 Decorator Pages Import 🔥
import MyProjects from "./pages/Dashboard/Decorator/MyProjects";
import Schedule from "./pages/Dashboard/Decorator/Schedule";
import DecoratorDashboard from "./pages/Dashboard/Decorator/DecoratorDashboard";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Default: User Dashboard (My Bookings) */}
        <Route index element={<MyBookings />} />

        {/* Common Profile Route */}
        <Route path="profile" element={<Profile />} />

        {/* --- Admin Routes --- */}
        <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="admin/services" element={<AdminRoute><ManageServices /></AdminRoute>} />
        <Route path="admin/bookings" element={<AdminRoute><AllBookings /></AdminRoute>} />
        <Route path="admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />

        {/* --- 🔥 Decorator Routes (New Added) 🔥 --- */}
        {/* এখানে DecoratorRoute দিতে পারেন যদি আলাদা প্রোটেকশন চান, আপাতত PrivateRoute এর ভেতরেই আছে */}
        
       <Route path="decorator/projects" element={<MyProjects />} /> 
<Route path="decorator/schedule" element={<Schedule />} />
      </Route>
    </Routes>
  );
}

export default App;