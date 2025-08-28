"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

interface UserData {
  id: string;
  name: string;
  email: string;
  height?: string;
  weight?: string;
  age?: number;
  healthGoals?: string;
  membershipStatus?: string;
  [key: string]: string | number | boolean | undefined; // More specific type for additional fields
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  login: (token: string, userData: UserData) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check if the user is authenticated
  const checkAuth = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return false;
      }

      // Verify token by fetching user profile
      const response = await api.get("/users/profile");
      setUser(response.data);
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token: string, userData: UserData) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
