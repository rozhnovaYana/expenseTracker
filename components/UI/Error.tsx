import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Error = ({ message }: { message: string }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.text, styles.header]}>Something went wrong...</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
  },
  text: {
    color: GlobalStyles.colors.error50,
    textAlign: 'center',
    fontFamily: "Montserrat-Regular"
  },
  header: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20
  }
});
