import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { CityType } from "../types/allTypes";
import { useCities } from "../customHooks/useCities";

function CityList() {
  const { isLoading, citiesData } = useCities();

  if (isLoading) return <Spinner />;

  if (!citiesData.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const cityCards = citiesData.map((city: CityType) => (
    <CityItem key={city.id} city={city} />
  ));

  return <ul className={styles.cityList}>{cityCards}</ul>;
}

export default CityList;
