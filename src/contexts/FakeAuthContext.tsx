import { createContext, useReducer } from "react";
import {
  ActionType,
  AuthContextType,
  StateType,
  UserType,
} from "../types/allTypes";

type Props = {
  children: React.ReactNode;
};

const initialState: StateType = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload as UserType,
        isAuthenticated: true,
      };
    case "logout":
      return initialState;

    default:
      return initialState;
  }
}

const AuthContext = createContext<null | AuthContextType>(null);

const FAKE_USER: UserType = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: Props) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
  }

  function logout() {
    dispatch({
      type: "logout",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
