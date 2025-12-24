import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/commonConstant";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../components/ui/loadingSpinner";
import RouteWrapper from "./routeWrapper";
import { AdminLayout, LoginLayout, UserLayout } from "../components/layout";
import Test from "../pages/test";
const LoginPage = lazy(() => import("../pages/login"));
const HomePage = lazy(() => import("../pages/home"));
const RegisterPage = lazy(() => import("../pages/register"));
const OrderPage = lazy(() => import("../pages/order"));
const OrderManagementPage = lazy(() => import("../pages/admin/cart"));
const AppRoutes = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      {/* Public Routes */}
      <Route
        path={ROUTES.HOME}
        element={
          <RouteWrapper layout={UserLayout}>
            <HomePage />
          </RouteWrapper>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <RouteWrapper layout={LoginLayout}>
            <LoginPage />
          </RouteWrapper>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <RouteWrapper layout={LoginLayout}>
            <RegisterPage />
          </RouteWrapper>
        }
      />
      {/* Protected Routes */}
      <Route
        path={ROUTES.CART}
        element={
          <RouteWrapper
            layout={UserLayout}
            allowedRoles={["customer", "admin"]}
          >
            <OrderPage />
          </RouteWrapper>
        }
      />
      {/** This page is only for testing purpose */}
      <Route
        path={ROUTES.TEST}
        element={
          <RouteWrapper layout={UserLayout} isAccept={true}>
            <Test />
          </RouteWrapper>
        }
      />
      <Route
        path={ROUTES.ORDER_MANAGEMENT}
        element={
          <RouteWrapper layout={AdminLayout} allowedRoles={["admin"]}>
            <OrderManagementPage />
          </RouteWrapper>
        }
      />
      {/* Fallback 404 */}
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  </Suspense>
);
export default AppRoutes;
