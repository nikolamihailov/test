import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please, log in first to access.");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={`/login?continue=${location.pathname}`} replace />;
  }
  if (isAuthenticated) {
    return <Outlet />;
  }
};

export default ProtectedRoute;
