import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    // console.log("token auth: ", token)
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};