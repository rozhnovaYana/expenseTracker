import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthParamList } from "../../navigation/types";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import Button from "../UI/Button";
import AuthForm from "./AuthForm";

export type Credentials = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};
export type Validation = {
  [key: string]: boolean;
};

type AuthContentNavigationProps = NativeStackScreenProps<
  AuthParamList,
  "LoginScreen"
>;

const AuthContent = ({
  isLogin = false,
  onAuthenticate,
}: {
  isLogin?: boolean;
  onAuthenticate: (email: string, password: string) => void;
}) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState<Validation>({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });
  const navigation = useNavigation<AuthContentNavigationProps["navigation"]>();

  function switchAuthModeHandler() {
    const replaceTo = isLogin ? "SignupScreen" : "LoginScreen";
    navigation.replace(replaceTo);
  }

  function submitHandler(credentials: Credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.match(/\@/g);
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate(email, password);
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </Button>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 30,
    marginHorizontal: 32,
    padding: 16,
    elevation: 2,
    shadowColor: GlobalStyles.colors.primary100,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  buttons: {
    marginTop: 8,
  },
});
