// src/routes/Routes.jsx
import { Route } from 'react-router-dom'

// Pages
import Home from '../pages/Home/Home'
import Services from '../pages/Services/Services'
import ServiceDetails from '../pages/Services/ServiceDetails'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import DashboardLayout from '../layout/DashboardLayout'

// Dashboard Pages
import UserDashboard from '../pages/Dashboard/UserDashboard'
import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard'
import MyBookings from '../pages/Dashboard/User/MyBookings'

// Routes
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
<Route path="/register" element={<Register />} />
const RoutesConfig = (
  <>
    <Route path="/home" element={<Home />} />
    <Route path="/services" element={<Services />} />
    <Route path="/services/:id" element={<ServiceDetails />} />
    
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Dashboard Routes */}
    <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
      <Route index element={<UserDashboard />} />
      <Route path="my-bookings" element={<MyBookings />} />
      <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    </Route>
  </>
)

export default RoutesConfig