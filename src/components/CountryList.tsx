import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import { CityType, CountryType } from "../types/allTypes";
import { useCities } from "../customHooks/useCities";

function CountryList() {
  const { citiesData, isLoading } = useCities();

  const countries: CountryType = [];

  citiesData.forEach((city: CityType) => {
    if (!countries.some((country) => country.country === city.country)) {
      countries.push(city);
    }
  });

  if (isLoading) return <Spinner />;

  if (!citiesData.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countryCards = countries.map((country: CityType) => (
    <CountryItem key={country.id} country={country} />
  ));

  return <ul className={styles.countryList}>{countryCards}</ul>;
}

export default CountryList;
