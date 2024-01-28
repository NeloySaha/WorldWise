import { useQuery } from "react-query";
import { useCities } from "./useCities";

export function useCurrentCity(cityId: number) {
  const { currentCityId } = useCities();

  const { data: currentCity, isLoading: curCityLoading } = useQuery({
    queryKey: ["cities", cityId],
    queryFn: async () => fetchCity(cityId),
    enabled: cityId !== currentCityId,
  });

  async function fetchCity(id: number) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/getCities/${id}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error("something happened");
    }
  }

  return { currentCity, curCityLoading };
}
