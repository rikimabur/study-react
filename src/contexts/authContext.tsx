import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { AuthData } from "../models/rootModel";

// 1. Define types for the context
interface AuthContextType {
  authData: AuthData | null;
  login: (authData: AuthData) => void;
  logout: () => void;
}

// 2. Create context with proper type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// 4. AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  const login = (data: AuthData) => setAuthData(data);
  const logout = () => setAuthData(null);

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
