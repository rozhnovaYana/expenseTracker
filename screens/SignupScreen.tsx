import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import { signUp } from "../utils/auth";

import { AuthContext, AuthContextType } from "../store/auth/authContext";
import Spinner from "../components/UI/Spinner";

const SignupScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const { setAuthorization } = useContext<AuthContextType>(AuthContext);

  const onAuthenticate = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { idToken, expiresIn } = await signUp(email, password);
      setAuthorization(idToken, expiresIn);
    } catch (error) {
      setLoading(false);
      Alert.alert('Something went wrong...', 'Can you check your data ot try later, please?')
    }
  };
  if (isLoading) return <Spinner />;
  return <AuthContent onAuthenticate={onAuthenticate}/>;
};

export default SignupScreen;
