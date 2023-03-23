import { useCallback, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage/";

import StackNavigator from "./navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider from "./store/auth/authContext";
import ExpensesContextProvider from "./store/expenses/expensesContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [token, setToken] = useState({
    initialtoken: "",
    initialexpiresIn: "",
    isLoading: true,
  });

  const [fontsLoaded] = useFonts({
    "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    const getToken = async () => {
      const newDate = new Date()?.getTime();
      try {
        const json = await AsyncStorage.getItem("token");
        if (json) {
          const { expiresIn, token } = JSON.parse(json);
          if (+expiresIn < newDate) {
            setToken({
              initialtoken: token,
              initialexpiresIn: expiresIn,
              isLoading: false,
            });
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setToken((token) => ({
          ...token,
          isLoading: false,
          initialexpiresIn: "",
        }));
      }
    };
    getToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !token.isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || token.isLoading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <StatusBar style="light" />
      <AuthContextProvider {...token}>
        <ExpensesContextProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </ExpensesContextProvider>
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
