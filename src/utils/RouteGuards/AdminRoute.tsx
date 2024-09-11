import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";

const AdminRoute = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please, log in first to access.");
    } else if (user?.role && user.role !== "ADMIN") {
      toast.error("Only admins can access this.");
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to={`/login`} replace />;
  }
  if (isAuthenticated && user?.role !== "ADMIN") {
    return <Navigate to={"/home"} />;
  }

  return <Outlet />;
};

export default AdminRoute;
