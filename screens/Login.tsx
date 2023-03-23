import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import { logIn } from "../utils/auth";

import { AuthContext, AuthContextType } from "../store/auth/authContext";
import Spinner from "../components/UI/Spinner";

const LoginScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const { setAuthorization } = useContext<AuthContextType>(AuthContext);

  const onAuthenticate = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { idToken, expiresIn } = await logIn(email, password);
      setAuthorization(idToken, expiresIn);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Something went wrong...",
        "Can you check your email and password, please?"
      );
    }
  };
  if (isLoading) return <Spinner />;
  return <AuthContent isLogin onAuthenticate={onAuthenticate} />;
};

export default LoginScreen;
