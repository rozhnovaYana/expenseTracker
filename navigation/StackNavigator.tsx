import { useContext } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import AuthorizedContent from "./AuthorizedContent";
import { StackParamList } from "./types";

import { AuthContext } from "../store/auth/authContext";

import { GlobalStyles } from "../constants/styles";

const { Navigator, Screen } = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  const { isAuthorizes } = useContext(AuthContext);
  
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: GlobalStyles.colors.primary800,
        },
      }}
    >
      {!isAuthorizes && <Screen name="AuthScreen" component={AuthNavigator} />}
      {isAuthorizes && <Screen name="AuthorizedContent" component={AuthorizedContent} />}
    </Navigator>
  );
};

export default StackNavigator;
