import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";

const DecoratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const location = useLocation();

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && role === "decorator") {
    return children;
  }

  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default DecoratorRoute;