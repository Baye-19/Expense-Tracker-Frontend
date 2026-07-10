
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

  // Load user on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.token) {
          // Get budget from separate storage
          const savedBudget = localStorage.getItem("userBudget");
          const savedBudgetType = localStorage.getItem("userBudgetType");
          
          setUser({
            ...parsedUser,
            budget: savedBudget ? Number(savedBudget) : null,
            budgetType: savedBudgetType || 'monthly',
          });
        } else {
          localStorage.removeItem("user");
        }
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setError(null);
    try {
      const res = await loginUser(credentials);
      const token = res.data.token;
      
      // Get saved budget from separate storage
      const savedBudget = localStorage.getItem("userBudget");
      const savedBudgetType = localStorage.getItem("userBudgetType");
      
      const userData = { 
        name: credentials.email.split("@")[0], 
        email: credentials.email, 
        token,
        budget: savedBudget ? Number(savedBudget) : null,
        budgetType: savedBudgetType || 'monthly',
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
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
        budgetType: 'monthly',
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return { success: true, hasBudget: false };
    } catch (err) {
      const msg = err.response?.data?.error || "Cannot connect to server";
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const setBudget = (amount, type) => {
    // Save budget SEPARATELY so it survives logout
    localStorage.setItem("userBudget", amount.toString());
    localStorage.setItem("userBudgetType", type);
    
    const updatedUser = { ...user, budget: Number(amount), budgetType: type };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    // Keep budget data even after logout
    // DO NOT remove userBudget from localStorage
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