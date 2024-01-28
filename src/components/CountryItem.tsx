import { CityType } from "../types/allTypes";
import styles from "./CountryItem.module.css";

type Props = {
  country: CityType;
};

function CountryItem({ country }: Props) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
