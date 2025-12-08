// src/App.jsx
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserDashboard from "./pages/Dashboard/UserDashboard";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
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
        <Route index element={<UserDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;