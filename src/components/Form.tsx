import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import Button from "./Button";
import { useUrlPosition } from "../customHooks/useUrlPosition";
import ButtonBack from "./ButtonBack";
import Message from "./Message";
import Spinner from "./Spinner";
import { CityType } from "../types/allTypes";

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [mapLat, mapLng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: cityData,
    isError,
    isLoading: isLoadingGeoCoding,
  } = useQuery({
    queryKey: [mapLat, mapLng],
    queryFn: fetchCityData,
    enabled: (mapLat as string)?.length > 0 && (mapLng as string)?.length > 0,
  });

  const { mutate: mutateCities, status: cityMutationStatus } = useMutation({
    mutationFn: addCity,
    onSuccess: () => {
      queryClient.invalidateQueries(["cities"]);
      navigate("/app/cities");
    },
  });

  async function fetchCityData() {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_REVERSE_GEO_API
        }?latitude=${mapLat}&longitude=${mapLng}`
      );

      const data = await res.json();

      if (!data.countryCode)
        throw new Error(
          "That doesn't seem to be a city. Click Somewhere Else 😉"
        );

      return data;
    } catch (err) {
      throw new Error(
        "That doesn't seem to be a city. Click Somewhere Else 😉"
      );
    }
  }

  async function addCity(newCity: CityType) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/addCity`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error("Error while adding City");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: Number(mapLat),
        lng: Number(mapLng),
      },
      id: Math.floor(Math.random() * 1234124 - 11),
    };

    mutateCities(newCity);
  }

  useEffect(() => {
    if (cityData) {
      setCityName(cityData.city || cityData.locality || "");
      setCountry(cityData.countryName);
      setEmoji(convertToEmoji(cityData.countryCode));
    }
  }, [cityData]);

  useEffect(() => {
    if (isError)
      setGeoCodingError(
        "That doesn't seem to be a city. Click Somewhere Else 😉"
      );
    else {
      setGeoCodingError("");
    }
  }, [isError]);

  if (!mapLat && !mapLng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (isLoadingGeoCoding) return <Spinner />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${
        cityMutationStatus === "loading" && styles.loading
      }`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(userDate: Date) => setDate(userDate)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}} type="primary">
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
