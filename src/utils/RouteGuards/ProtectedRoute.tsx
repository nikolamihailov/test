import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("This path is not accessible. Please log in first.");
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  if (shouldRedirect) {
    return <Navigate to={`/login?continue=${location.pathname}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;