import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as { session: Session | null });

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
