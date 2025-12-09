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

import MyBookings from "./pages/Dashboard/MyBookings";
import PrivateRoute from "./routes/PrivateRoute";

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

     
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        
        <Route index element={<MyBookings />} />
      </Route>
    </Routes>
  );
}

export default App;