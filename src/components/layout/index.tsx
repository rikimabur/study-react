import type { LayoutProps } from "../../models/rootModel";
import Footer from "./footer";
import Header from "./header";

export const LoginLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="login-layout">{children}</div>
);

export const AdminLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="admin-layout">
    <Header />
    {children}
    <Footer />
  </div>
);

export const UserLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="user-layout">
    <Header />
    {children}
    <Footer />
  </div>
);
