import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    const userData = {
      email,
      name: email.split("@")[0],
      role: email.includes("admin") ? "admin" : "user",
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  }
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
