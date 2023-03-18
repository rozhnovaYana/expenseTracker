import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Spinner = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size={34} color={GlobalStyles.colors.primary50} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },
});
