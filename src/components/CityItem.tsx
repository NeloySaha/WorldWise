import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import styles from "./CityItem.module.css";
import { CityType } from "../types/allTypes";
import { useCities } from "../customHooks/useCities";

type Props = {
  city: CityType;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "short",
  }).format(new Date(date as Date));

function CityItem({ city }: Props) {
  const { emoji, cityName, date, id, position } = city;
  const { currentCityId } = useCities();
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries(["cities"]);
    },
  });

  async function deleteCity(cityId: number) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/deleteCity`, {
        method: "POST",
        body: JSON.stringify({ cityId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error("Error while Deleting City");
    }
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    deleteMutation(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCityId && styles["cityItem--active"]
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date as Date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
