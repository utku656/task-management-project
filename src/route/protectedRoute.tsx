import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PageProps } from "../utils/types";

export const ProtectedRoute = ({ children }: PageProps) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
