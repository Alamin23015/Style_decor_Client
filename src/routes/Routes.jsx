import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services"; 
import DashboardLayout from "../layout/DashboardLayout"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />, 
    children: [
      {
        path: "my-bookings", 
        element: <div>My Bookings Page (Coming Soon)</div>, 
      },
      {
        path: "all-users", 
        element: <div>All Users Page (Coming Soon)</div>,
      },
      {
        path: "my-projects", 
        element: <div>My Projects Page (Coming Soon)</div>,
      }
    ]
  },
]);