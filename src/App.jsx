// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import ServiceDetails from "./pages/Services/ServiceDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import MyBookings from "./pages/Dashboard/User/MyBookings";
import Profile from "./pages/Dashboard/User/Profile"; // ← এটা আলাদা রুটে

import ManageServices from "./pages/Dashboard/Admin/ManageServices";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import AllBookings from "./pages/Dashboard/Admin/AllBookings";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers";

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

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* এখানে /dashboard মানে My Bookings */}
        <Route index element={<MyBookings />} />

        {/* Profile আলাদা রুটে */}
        <Route path="profile" element={<Profile />} />

        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="admin/services" element={<AdminRoute><ManageServices /></AdminRoute>} />
        <Route path="admin/bookings" element={<AdminRoute><AllBookings /></AdminRoute>} />
        <Route path="admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />

        {/* Decorator Route */}
        <Route path="decorator" element={<DecoratorDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;