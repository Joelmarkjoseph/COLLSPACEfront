import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Create the custom hook to access the context
export const useAuth = () => {
  return useContext(AuthContext); // Return context value (user data, login function)
};

// Create the AuthProvider to manage the user state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData); // Save user data in state
    localStorage.setItem("userData", JSON.stringify(userData)); // Store it in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData"); // Remove user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
