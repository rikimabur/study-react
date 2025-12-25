import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface RouteWrapperProps {
  children: ReactNode;
  layout?: React.FC<{ children: ReactNode }>;
  allowedRoles?: string[];
  adminRedirectPath?: string; // optional prop to redirect admins
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({
  children,
  layout: Layout,
  allowedRoles = [],
}) => {
  const { isAuthenticated, authData } = useSelector(
    (state: RootState) => state.auth
  );
  const userRole = authData?.user?.role;
  // Not logged in
  if (!isAuthenticated && allowedRoles.length > 0) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but user role is not allowed
  if (
    allowedRoles.length > 0 &&
    (!userRole || !allowedRoles.includes(userRole))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }
  // Render with layout if provided
  return Layout ? <Layout>{children}</Layout> : <>{children}</>;
};

export default RouteWrapper;
