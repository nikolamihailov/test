import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";

interface AuthContextType {
  isAuthenticated: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ token: string } | null>(() => {
    const storedUser = localStorage.getItem("auth");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = useCallback((token: string) => {
    setUser({ token });
    localStorage.setItem("auth", JSON.stringify({ token }));
  }, []);

  const logoutUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth");
    toast.success("Successfully logged out!");
  }, []);

  const values = {
    isAuthenticated: !!user,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
