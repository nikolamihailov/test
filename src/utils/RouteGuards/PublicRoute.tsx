import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      toast.error("Logout to access this");
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  if (shouldRedirect) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
