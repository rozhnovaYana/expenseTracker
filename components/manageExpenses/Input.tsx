import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TextProps,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface IInputProps {
  label: string;
  textInputProps?: TextInputProps;
  children?: React.ReactNode;
  value: string;
  isValid: boolean;
}

const Input: React.FC<IInputProps> = ({
  label,
  textInputProps,
  children,
  value,
  isValid,
}) => {
  const isMultiLine = textInputProps?.multiline;
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>{label}</Text>
      <View style={[styles.inputWrapper, !isValid && styles.inputInvalid]}>
        <TextInput
          value={value}
          style={[styles.input, isMultiLine && styles.multiLine]}
          placeholderTextColor={GlobalStyles.colors.primary700}
          {...textInputProps}
        />
        {children}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    textAlign: "left",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error50
  },
  inputWrapper: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.primary200,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: "space-between",
  },
  inputInvalid: {
    borderBottomColor: GlobalStyles.colors.error500
  },
  input: {
    padding: 6,
    color: GlobalStyles.colors.primary50,
  },
  multiLine: {
    textAlignVertical: "top",
  },
});
