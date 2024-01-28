import React from "react";

export type PositionType = {
  lat: number;
  lng: number;
};

export type CityType = {
  cityName: string;
  country: string;
  date: string | Date;
  emoji: string;
  id: number;
  notes: string;
  position: PositionType;
};

export type CountryType = CityType[];

export type currentCityType = {
  currentCity: CityType | undefined;
  curCityLoading: boolean;
};

export type CitiesContextType = {
  citiesData: CityType[];
  isLoading: boolean;
  currentCityId: number | null;
  setCurrentCityId: React.Dispatch<React.SetStateAction<number | null>>;
};

export type UserType = {
  email: string;
  password: string;
  name: string;
  avatar: string;
};

export type StateType = {
  user: UserType | null;
  isAuthenticated: boolean;
};

export type ActionType = {
  type: string;
  payload?: UserType;
};

export type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

// mutateCities: UseMutateFunction<unknown, unknown, CityType, unknown>;
//   cityMutationStatus: "error" | "idle" | "loading" | "success";
