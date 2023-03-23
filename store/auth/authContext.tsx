import { createContext, useReducer, useEffect } from "react";
import authReducer, { AuthActionType } from "./authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage/";

export interface AuthContextType {
  token: {
    token: string;
    expiresIn: string;
  };
  isAuthorizes: boolean;
  setAuthorization: (token: string, expiresIn: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: { token: "", expiresIn: "0" },
  isAuthorizes: false,
  setAuthorization: (token, expiresIn) => {},
  signOut: () => {},
});

const AuthContextProvider = ({
  children,
  initialtoken,
  initialexpiresIn,
}: {
  children: React.ReactNode;
  initialtoken: string;
  initialexpiresIn: string;
}) => {
  const [token, dispatch] = useReducer(authReducer, {
    token: initialtoken,
    expiresIn: initialexpiresIn,
  });

  useEffect(() => {
    if (!!initialexpiresIn) {
      setAuthorization(initialtoken, initialexpiresIn);
    }
  }, [initialexpiresIn]);

  const setAuthorization = (token: string, expiresIn: string) => {
    dispatch({
      type: AuthActionType.SET,
      payload: {
        token,
        expiresIn,
      },
    });
    AsyncStorage.setItem("token", JSON.stringify({ token, expiresIn }));
  };

  const signOut = () => {
    dispatch({
      type: AuthActionType.DELETE,
      payload: {},
    });
    AsyncStorage.removeItem("token");
  };

  const value = {
    token,
    isAuthorizes: !!token.token,
    setAuthorization,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
