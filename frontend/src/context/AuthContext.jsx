import { createContext, useEffect, useState } from "react";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Get Current User
  // ==========================
  const fetchCurrentUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Register
  // ==========================
  const register = async (userData) => {
    const data = await registerUser(userData);
    return data;
  };

  // ==========================
  // Login
  // ==========================
  const login = async (userData) => {
    const data = await loginUser(userData);

    console.log("Login Data:", data);

    setUser(data.user);

    return data;
  };

  // ==========================
  // Logout
  // ==========================
  const logout = async () => {
    const data = await logoutUser();

    setUser(null);

    return data;
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        fetchCurrentUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
