// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser, getUserProfile } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) { setLoading(false); return; }
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.token) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem("user");
      }
    } catch {
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setError(null);
    try {
      const res = await loginUser(credentials);
      const token = res.data.token;
      const userData = { 
        name: credentials.email.split("@")[0], 
        email: credentials.email, 
        token,
        budget: null,      // Will be set later
        budgetType: null,  // 'monthly' or 'yearly'
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true, hasBudget: false };
    } catch (err) {
      const msg = err.response?.data?.error || "Cannot connect to server";
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const res = await registerUser(userData);
      const token = res.data.token;
      const newUser = { 
        name: userData.name, 
        email: userData.email, 
        token,
        budget: null,
        budgetType: null,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      // Return hasBudget: false so we know to show budget setup
      return { success: true, hasBudget: false };
    } catch (err) {
      const msg = err.response?.data?.error || "Cannot connect to server";
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const setBudget = (amount, type) => {
    const updatedUser = { ...user, budget: Number(amount), budgetType: type };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setError(null);
  };

  const updateUser = (data) => {
    const newUser = { ...user, ...data };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{
      user, loading, error, isAuthenticated: !!user?.token,
      login, register, logout, updateUser, setBudget, setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};