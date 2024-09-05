/* import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const { user } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (user?.role && user.role !== "ADMIN") {
      toast.error("Only admins can access this.");
      setShouldRedirect(true);
    }
  }, [user]);

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
 */
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const { user, isAuthenticated } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Your session has expired. Please log in again.");
      setShouldRedirect(true);
    } else if (user?.role && user.role !== "ADMIN") {
      toast.error("Only admins can access this.");
      setShouldRedirect(true);
    }
  }, [isAuthenticated, user]);

  if (shouldRedirect) {
    return (
      <Navigate to={!isAuthenticated ? `/login?continue=${location.pathname}` : "/"} replace />
    );
  }

  return <Outlet />;
};

export default AdminRoute;
