import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import AllExpenses from "../screens/AllExpenses";
import RecentExpenses from "../screens/RecentExpenses";
import { TabParamList } from "./types";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";

const { Navigator, Screen } = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
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
