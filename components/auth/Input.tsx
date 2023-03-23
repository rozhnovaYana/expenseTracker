import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({
  label,
  inputProps,
  isInvalid,
}: {
  label: string;
  inputProps: TextInputProps;
  isInvalid: boolean;
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        {...inputProps}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: GlobalStyles.colors.primary50,
    marginBottom: 4,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16
  },
  labelInvalid: {
    color: GlobalStyles.colors.error50,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    borderColor: GlobalStyles.colors.error50,
    borderWidth: 2
  },
});
