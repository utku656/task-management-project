import React, { createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../utils/types";
import { useLocalStorage } from "./useLocalStorage";

interface AuthContextType {
  user: UserAuth | null;
  login: (user: UserAuth) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = (user: UserAuth) => {
    setUser(user);
    navigate("/homepage");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
