import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RouteWrapperProps {
  children: ReactNode;
  layout?: React.FC<{ children: ReactNode }>;
  allowedRoles?: string[];
  isAccept?: boolean | false;
}

interface User {
  token: string;
  role: string;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({
  children,
  layout: Layout,
  allowedRoles = [],
  isAccept,
}) => {
  if (!isAccept) {
    const user: User | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );
    const isLoggedIn = !!user?.token;

    // Not logged in
    if (!isLoggedIn && allowedRoles.length > 0) {
      return <Navigate to="/login" replace />;
    }

    // Logged in but role not allowed
    if (allowedRoles.length > 0 && !allowedRoles.includes(user!.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Render with layout if provided
  return Layout ? <Layout>{children}</Layout> : <>{children}</>;
};

export default RouteWrapper;
