import type { ReactNode } from "react";

export interface UserModel {
  fullName?: string;
  id: string;
  email: string;
  role?: string;
  exp: number;
}
export interface IRouter {
  path?: string;
  key: string;
  component?: ReactNode;
  children?: IRouter[];
  index?: boolean;
}
interface RouterMeta {
  title: string;
  icon?: string;
}

export interface IRoute {
  path: string;
  meta: RouterMeta;
  isAuth?: boolean;
  children?: IRoute[];
  hidden?: boolean;
}

export interface LoginModel {
  username: string;
  password: string;
  expiresInMins: number | 30;
}
export interface UserRegisterModel {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: T;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  rating: number | 0;
  image: string[];
}
export interface OrderModel {
  items: OrderItem[];
  totalAmount: number;
  totalItems: number;
}
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
export interface ApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string[];
  result: T;
}
export interface PaginationResult<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}
export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface UserProfile {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  role: Role | Role.CUSTOMER;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
  isAuthenticated: boolean | false;
}

export interface OrderRequest {
  userId: number;
  products: ProductOrder[];
}

export interface ProductOrder {
  id: number;
  quantity: number;
}
// After finishing order
export interface OrderResponse {
  id: number;
  products: OrderProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface OrderProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}
export enum Role {
  GUEST = "GUEST",
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}
export interface LayoutProps {
  children: ReactNode;
}
