import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/authSlice";

const PublicRoute = () => {
  const { authData } = useSelector(selectAuth);

  // If user is logged in, redirect away from login/register
  if (authData?.accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // render nested public routes
};

export default PublicRoute;
