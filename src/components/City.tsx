import { useParams } from "react-router-dom";
import { useEffect } from "react";

import styles from "./City.module.css";
import { useCurrentCity } from "../customHooks/useCurrentCity";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";
import { useCities } from "../customHooks/useCities";

const formatDate = (date: string | null) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date as string));

function City() {
  const { id } = useParams();
  const { currentCity, curCityLoading } = useCurrentCity(Number(id));
  const { cityName, emoji, date, notes } = currentCity || {};
  const { setCurrentCityId } = useCities();

  useEffect(() => {
    setCurrentCityId(Number(id));
  }, [id, setCurrentCityId]);

  if (curCityLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
