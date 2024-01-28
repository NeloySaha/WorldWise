import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { CitiesContextType } from "../types/allTypes";

type Props = {
  children: React.ReactNode;
};

const CitiesContext = createContext<CitiesContextType | null>(null);

function CitiesProvider({ children }: Props) {
  const [currentCityId, setCurrentCityId] = useState<number | null>(null);

  const { data: citiesData, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  async function getCities() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/getCities`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error("something happened");
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        citiesData,
        isLoading,
        currentCityId,
        setCurrentCityId,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
