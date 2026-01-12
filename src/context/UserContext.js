"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(
        "UserContext useEffect: Failed to load user from localStorage:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Custom setUser function to also save to localStorage
  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
