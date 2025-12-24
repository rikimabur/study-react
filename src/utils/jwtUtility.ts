import { jwtDecode } from "jwt-decode";
import type { UserModel } from "../models/rootModel";
const decodeJWT = (token: string) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  const decodedToken = decodeJWT(token);
  return !decodedToken?.exp || decodedToken.exp * 1000 < Date.now();
};

export const getUserInfoFromToken = (token: string) => {
  const decodedToken = decodeJWT(token) as UserModel | null;
  return decodedToken;
};
