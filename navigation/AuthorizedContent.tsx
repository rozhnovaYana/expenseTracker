import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpanse from "../screens/ManageExpense";
import { AuthorizedContentList } from "./types";
import TabNavigator from "./BottomNavigator";

import { GlobalStyles } from "../constants/styles";

const { Navigator, Screen } =
  createNativeStackNavigator<AuthorizedContentList>();

const AuthorizedContent = () => {
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
        options={{ headerShown: false, title: "ExpensesList" }}
      />
      <Screen
        name="ManageExpense"
        component={ManageExpanse}
        options={{ presentation: "modal", title: "Manage Expense" }}
      />
    </Navigator>
  );
};

export default AuthorizedContent;
