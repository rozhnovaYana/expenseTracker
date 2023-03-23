import axios from "axios";
const API_KEY = "AIzaSyBazK82rcADwDc_R4ot0aPlraybYYPkh94";
const BASE_URL = `https://identitytoolkit.googleapis.com/v1/`;

const authHandler = async (
  option: "signInWithPassword" | "signUp",
  email: string,
  password: string
) => {
  const response = await axios.post(
    `${BASE_URL}accounts:${option}?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  const data = new Date().getTime();
  const { idToken, expiresIn } = response.data;
  return {
    idToken,
    expiresIn: (data + +expiresIn)?.toString(),
  };
};

export const logIn = (email: string, password: string) =>
  authHandler("signInWithPassword", email, password);
export const signUp = (email: string, password: string) =>
  authHandler("signUp", email, password);
