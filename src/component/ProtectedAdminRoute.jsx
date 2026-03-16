import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // if (!user || user.role !== "admin") {
  //   toast.error("Access Denied: Admins Only");
  //   return <Navigate to="/login" replace />;
  // }
  if (!user || user.role !== "admin") {
  setTimeout(() => {
    toast.error("Access Denied: Admins Only");
  }, 0);

  return <Navigate to="/login" replace />;
}

  return children;
};
