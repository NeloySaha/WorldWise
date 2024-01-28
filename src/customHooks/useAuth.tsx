import { useContext } from "react";
import { AuthContext } from "../contexts/FakeAuthContext";
import { AuthContextType } from "../types/allTypes";

function useAuth() {
  const context = useContext(AuthContext) as AuthContextType;

  if (context === undefined)
    throw new Error("AuthContext was used outside the auth provider");
  return context;
}

export { useAuth };
