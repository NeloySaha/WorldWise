import { useContext } from "react";
import { CitiesContextType } from "../types/allTypes";
import { CitiesContext } from "../contexts/CitiesContext";

export function useCities() {
  const context = useContext(CitiesContext) as CitiesContextType;

  if (context === undefined)
    throw new Error("Cities Context was used outside the cities Provider");

  return context;
}
