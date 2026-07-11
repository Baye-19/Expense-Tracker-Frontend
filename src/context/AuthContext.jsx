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

  // Load user on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.token) {
          // Get profile image and budget from separate storage
          const savedProfileImage = localStorage.getItem("userProfileImage");
          const savedBudget = localStorage.getItem("userBudget");
          const savedBudgetType = localStorage.getItem("userBudgetType");
          const savedPhone = localStorage.getItem("userPhone");
          const savedBio = localStorage.getItem("userBio");

          setUser({
            ...parsedUser,
            profileImage: savedProfileImage || null,
            budget: savedBudget ? Number(savedBudget) : (parsedUser.budget || null),
            budgetType: savedBudgetType || (parsedUser.budgetType || 'monthly'),
            phone: savedPhone || (parsedUser.phone || ''),
            bio: savedBio || (parsedUser.bio || ''),
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

      // Get saved data from separate storage
      const savedProfileImage = localStorage.getItem("userProfileImage");
      const savedBudget = localStorage.getItem("userBudget");
      const savedBudgetType = localStorage.getItem("userBudgetType");
      const savedPhone = localStorage.getItem("userPhone");
      const savedBio = localStorage.getItem("userBio");

      const userData = {
        name: credentials.email.split("@")[0],
        email: credentials.email,
        token,
        profileImage: savedProfileImage || null,
        budget: savedBudget ? Number(savedBudget) : null,
        budgetType: savedBudgetType || 'monthly',
        phone: savedPhone || '',
        bio: savedBio || '',
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
        profileImage: null,
        budget: null,
        budgetType: 'monthly',
        phone: '',
        bio: '',
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
    localStorage.setItem("userBudget", amount.toString());
    localStorage.setItem("userBudgetType", type);

    const updatedUser = { ...user, budget: Number(amount), budgetType: type };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    // KEEP profile image, budget, phone, and bio
    // Only remove the user session (token)
    setUser(null);
    localStorage.removeItem("user");
    setError(null);
    // DO NOT remove: userProfileImage, userBudget, userBudgetType, userPhone, userBio
  };

  const updateUser = (data) => {
    // Save profile image separately so it survives logout
    if (data.profileImage !== undefined) {
      if (data.profileImage) {
        localStorage.setItem("userProfileImage", data.profileImage);
      } else {
        localStorage.removeItem("userProfileImage");
      }
    }

    // Save phone separately
    if (data.phone !== undefined) {
      if (data.phone) {
        localStorage.setItem("userPhone", data.phone);
      } else {
        localStorage.removeItem("userPhone");
      }
    }

    // Save bio separately
    if (data.bio !== undefined) {
      if (data.bio) {
        localStorage.setItem("userBio", data.bio);
      } else {
        localStorage.removeItem("userBio");
      }
    }

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