import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  if (!["admin", "editor"].includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
