import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import AllExpenses from "../screens/AllExpenses";
import RecentExpenses from "../screens/RecentExpenses";
import { TabParamList } from "./types";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";

import { useContext } from "react";
import { AuthContext, AuthContextType } from "../store/auth/authContext";
const { Navigator, Screen } = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const { signOut } = useContext<AuthContextType>(AuthContext);
  return (
    <Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
        },
        headerTintColor: GlobalStyles.colors.primary50,
        headerTitleStyle: {
          fontFamily: "Montserrat-SemiBold",
        },
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
          height: 60,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accents500,
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: "Montserrat-Medium",
        },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add-circle-outline"
            color={tintColor}
            size={24}
            onPress={() => navigation.navigate("ManageExpense")}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="log-out"
            color={tintColor}
            size={24}
            onPress={signOut}
          />
        ),
      })}
      sceneContainerStyle={{
        backgroundColor: GlobalStyles.colors.primary800,
      }}
    >
      <Screen
        name="AllExpanses"
        component={AllExpenses}
        options={{
          title: "All Expanses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="RecentExpanses"
        component={RecentExpenses}
        options={{
          title: "Recent Expanses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
};

export default TabNavigator;
