"use client";
import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  ReactNode,
} from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import { authorize } from "@/app/_lib/data-service";
import { toast } from "sonner";

AuthProvider.propTypes = {
  children: PropTypes.any,
};
const AuthContext = createContext<
  | {
      user: User | null;
      setUser: (user: User | null) => void;
      logout: () => void;
      isAuthenticating: boolean;
      authenticated: boolean;
      isLogoutAction: boolean;
      getToken: () => string | void;
    }
  | undefined
>(undefined);

type User = {
  token: string;
};

function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLogoutAction, setLogoutAction] = useState(false);

  // Load user from localStorage on initial mount
  useEffect(() => {
    setIsAuthenticating(true);
    const storedUser = localStorage.getItem("user");

    console.log("page changing");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticating(false);
      // just addedd incase of braking changes
      setAuthenticated(false);
    }
  }, []);

  // Check authenticated on mount and on router change
  useEffect(() => {
    if (!user) {
      setAuthenticated(false);
      return;
    }

    (async function authenticate() {
      setIsAuthenticating(true);
      try {
        await authorize(user?.token);
        setAuthenticated(true);
      } catch {
        logout();
      } finally {
        setIsAuthenticating(false);
      }
    })();
  }, [user]);

  // Set User (only when user is not null)
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Logout function
  function logout() {
    localStorage.removeItem("user");
    setUser(null);
    setAuthenticated(false);
    setLogoutAction(true);
  }

  function getToken(): string | void {
    const storedUser = localStorage.getItem("user");
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;
    if (!user) {
      setUser(null);
      toast.error("You are not logged in!");
      return router.push("/login");
    }
    return user.token;
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
