import React, { createContext, useState, useEffect } from "react";
import {
  initAuthClient,
  login,
  logout,
  isAuthenticated,
  getIdentity,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const client = await initAuthClient();
      if (await isAuthenticated()) {
        const identity = getIdentity();
        setUser(identity.getPrincipal().toString());
      }
      setAuthReady(true);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};
