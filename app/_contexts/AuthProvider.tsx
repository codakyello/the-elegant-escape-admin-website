"use client";
import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authorize } from "@/app/_lib/data-service";
import { toast } from "sonner";
import Cookies from "js-cookie";

type User = {
  token: string;
  isRoot: boolean;
  _id: string;
  email: string;
  name: string;
  image: string;
};
const AuthContext = createContext<
  | {
      user: User | null;
      isAuthenticating: boolean;
      authenticated: boolean;
      isLogoutAction: boolean;
      logout: () => void;
      setUser: (user: User | null) => void;
      setToken: (token: string) => void;
      getToken: () => string | null;
    }
  | undefined
>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLogoutAction, setLogoutAction] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Load user from localStorage on initial mount
  useEffect(() => {
    setIsAuthenticating(true);
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setToken(JSON.parse(token));
      Cookies.set("token", JSON.parse(token));
    } else {
      setIsAuthenticating(false);
      // just addedd incase of breaking changes
      setAuthenticated(false);
    }
  }, []);

  // Check authenticated on mount and on router change
  useEffect(() => {
    if (!token) {
      setAuthenticated(false);
      return;
    }

    (async function authenticate() {
      setIsAuthenticating(true);
      try {
        await authorize(token);
        setAuthenticated(true);
      } catch {
        logout();
      } finally {
        setIsAuthenticating(false);
      }
    })();
  }, [token]);

  // Set User (only when user is not null)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      Cookies.set("token", token);
    }
  }, [user, token]);

  // Logout function
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setAuthenticated(false);
    setLogoutAction(true);
  }

  function getToken(): string | null {
    const storedToken = localStorage.getItem("token");
    const token: string | null = storedToken ? JSON.parse(storedToken) : null;
    if (!token) {
      setToken(null);
      toast.error("You are not logged in!");
      router.push("/login");
    }
    return token;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticating,
        authenticated,
        isLogoutAction,
        setToken,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("You cannot use Authentication outside its provider");

  return context;
}

export default AuthProvider;
