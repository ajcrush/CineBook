import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function PrivateRoute({ children, requiredRole = null }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}
