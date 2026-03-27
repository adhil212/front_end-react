import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token || user.role !== "admin") {
    toast.error("Access Denied: Admins Only");
    return <Navigate to="/login" replace />;
  }

  return children;
};