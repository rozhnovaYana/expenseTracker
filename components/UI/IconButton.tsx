import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../../constants/styles";

interface IIconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string | undefined;
  onPress: () => void;
}
const IconButton: React.FC<IIconButtonProps> = ({
  icon,
  size,
  color,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },
});
