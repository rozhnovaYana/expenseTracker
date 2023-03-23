import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../UI/Button";
import Input from "./Input";

import type { Validation, Credentials } from "./AuthContent";

enum InputType {
  EMAIL = "email",
  CONFIRM_EMAIL = "confirmEmail",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}
function AuthForm({
  isLogin,
  onSubmit,
  credentialsInvalid,
}: {
  isLogin: boolean;
  onSubmit: (credentials: Credentials) => void;
  credentialsInvalid: Validation;
}) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: InputType, enteredValue: string) {
    switch (inputType) {
      case InputType.EMAIL:
        setEnteredEmail(enteredValue);
        break;
      case InputType.CONFIRM_EMAIL:
        setEnteredConfirmEmail(enteredValue);
        break;
      case InputType.PASSWORD:
        setEnteredPassword(enteredValue);
        break;
      case InputType.CONFIRM_PASSWORD:
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <View>
        <Input
          label="Email Address"
          inputProps={{
            onChangeText: (value: string) =>
              updateInputValueHandler(InputType.EMAIL, value),
            value: enteredEmail,
            keyboardType: "email-address",
          }}
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            isInvalid={emailsDontMatch}
            inputProps={{
              onChangeText: (value: string) =>
                updateInputValueHandler(InputType.CONFIRM_EMAIL, value),
              value: enteredConfirmEmail,
              keyboardType: "email-address",
            }}
          />
        )}
        <Input
          label="Password"
          isInvalid={passwordIsInvalid}
          inputProps={{
            onChangeText: (value: string) =>
              updateInputValueHandler(InputType.PASSWORD, value),
            value: enteredPassword,
            secureTextEntry: true,
          }}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            isInvalid={passwordsDontMatch}
            inputProps={{
              onChangeText: (value: string) =>
                updateInputValueHandler(InputType.CONFIRM_PASSWORD, value),
              value: enteredConfirmPassword,
              secureTextEntry: true,
            }}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
