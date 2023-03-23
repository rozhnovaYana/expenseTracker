import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/SignupScreen";
import { AuthParamList } from "./types";

import { GlobalStyles } from "../constants/styles";

const { Navigator, Screen } = createNativeStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
        },
        headerTintColor: GlobalStyles.colors.primary50,
        headerTitleStyle: {
          fontFamily: "Montserrat-SemiBold",
        },
        headerTitleAlign: "center",
        contentStyle: {
          backgroundColor: GlobalStyles.colors.primary800,
        },
      }}
    >
      <Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ title: "Signup" }}
      />
    </Navigator>
  );
};

export default AuthNavigator;
