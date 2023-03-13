import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpanse from "../screens/ManageExpense";
import { StackParamList } from "./types";
import TabNavigator from "./BottomNavigator";

import { GlobalStyles } from "../constants/styles";

const { Navigator, Screen } = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
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
        name="ExpensesList"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name="ManageExpense"
        component={ManageExpanse}
        options={{ presentation: "modal" }}
      />
    </Navigator>
  );
};

export default StackNavigator;
