import type {
  AuthData,
  LoginModel,
  UserRegisterModel,
} from "../models/rootModel";
const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  loginUser: async (formData: LoginModel) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error("Login failed");
    }
    const data = await res.json();
    const authData: AuthData = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: {
        id: data.id,
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      },
      isAuthenticated: true,
    };

    return authData;
  },

  registerUser: async (formData: UserRegisterModel) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return await res.json();
  },
};
