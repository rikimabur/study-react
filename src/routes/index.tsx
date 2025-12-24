import { Routes, Route } from "react-router-dom";
import { ROLES, ROUTES } from "../constants/commonConstant";
import { lazy, Suspense, type ReactNode } from "react";
import LoadingSpinner from "../components/ui/loadingSpinner";
import RouteWrapper from "./routeWrapper";
import { AdminLayout, LoginLayout, UserLayout } from "../components/layout";
import Test from "../pages/test";
const LoginPage = lazy(() => import("../pages/login"));
const HomePage = lazy(() => import("../pages/home"));
const RegisterPage = lazy(() => import("../pages/register"));
const OrderPage = lazy(() => import("../pages/order"));
const OrderManagementPage = lazy(() => import("../pages/admin/cart"));
const UserManagementPage = lazy(() => import("../pages/admin/users"));

export interface AppRoute {
  path: string;
  element: ReactNode;
  layout?: React.FC<{ children: ReactNode }>;
  allowedRoles?: string[];
  protected?: boolean;
}
const appRoutesConfig: AppRoute[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    layout: UserLayout,
  },
  {
    path: ROUTES.CART,
    element: <OrderPage />,
    layout: UserLayout,
    allowedRoles: [ROLES.CUSTOMER],
    protected: true,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
    layout: LoginLayout,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
    layout: LoginLayout,
  },
  {
    path: ROUTES.ORDER_MANAGEMENT,
    element: <OrderManagementPage />,
    layout: AdminLayout,
    allowedRoles: [ROLES.ADMIN],
    protected: true,
  },
  {
    path: ROUTES.USER_MANAGEMENT,
    element: <UserManagementPage />,
    layout: AdminLayout,
    allowedRoles: [ROLES.ADMIN],
    protected: true,
  },
  {
    path: ROUTES.TEST,
    element: <Test />,
    layout: UserLayout,
  },
  {
    path: "*",
    element: <p>Page not found</p>,
  },
];
const AppRoutes = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      {appRoutesConfig.map(({ path, element, layout, allowedRoles }, idx) => (
        <Route
          key={idx}
          path={path}
          element={
            <RouteWrapper layout={layout} allowedRoles={allowedRoles}>
              {element}
            </RouteWrapper>
          }
        />
      ))}
    </Routes>
  </Suspense>
);
export default AppRoutes;
