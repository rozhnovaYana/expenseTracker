import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface IButton {
  children: React.ReactNode;
  mode?: "flat";
  style?: ViewStyle;
  onPress: () => void;
}

const Button: React.FC<IButton> = ({ children, mode, style, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        styles.container,
        mode === "flat" && styles.containerFlat,
        style,
      ]}
    >
      <Text style={[styles.text, mode === "flat" && styles.textFlat]}>
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 10,
  },
  containerFlat: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
    color: GlobalStyles.colors.primary800,
  },
  textFlat: {
    color: GlobalStyles.colors.primary100,
  },
  pressed: {
    opacity: 0.7,
  },
});
