import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/authSlice";
import { ROUTES } from "../constants/commonConstant";
import type { Role } from "../models/rootModel";

interface PrivateRouteProps {
  allowedRoles?: Role[];
}
const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated, authData } = useSelector(selectAuth);
  const location = useLocation();
  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />
    );
  }
  if (
    allowedRoles &&
    authData?.user &&
    !allowedRoles.includes(authData?.user.role)
  ) {
    return <Navigate to="/" replace />; // redirect if role not allowed
  }

  return <Outlet />; // render nested public routes
};

export default PrivateRoute;
