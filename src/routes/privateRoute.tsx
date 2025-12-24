import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { ROUTES } from "../constants/commonConstant";
import type { Role } from "../models/rootModel";

interface PrivateRouteProps {
  allowedRoles?: Role[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { authData } = useAuth();
  const location = useLocation();

  // Not authenticated → redirect to login
  if (!authData?.isAuthenticated) {
    return (
      <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />
    );
  }

  // Role check → redirect if role not allowed
  const userRole = authData.user.role;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // Render nested routes
  return <Outlet />;
};

export default PrivateRoute;
