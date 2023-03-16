import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Expense } from "../../types/expenses";

import Calendar from "./Calendar";
import Input from "./Input";
import Button from "../UI/Button";
import {
  checkStringIsPrice,
  checkStringIsDate,
  checkStringIsNotEmpty,
} from "../../utils/validation";
import { invalid } from "moment";
import { GlobalStyles } from "../../constants/styles";

export type ExpenseInput = {
  [Value in keyof Expense]: {
    value: string;
    isValid: boolean;
  };
};

const Form = ({
  confirmLabel,
  closeModal,
  confirmExpense,
  initialItem,
}: {
  confirmLabel: string;
  closeModal: () => void;
  confirmExpense: (expense: Expense) => void;
  initialItem: Expense;
}) => {
  const { date, text, price } = initialItem;
  const [expense, setExpense] = useState<ExpenseInput>({
    date: {
      value: date,
      isValid: true,
    },
    text: {
      value: text,
      isValid: true,
    },
    price: {
      value: price,
      isValid: true,
    },
  });

  const updateExpenseData = (option: keyof Expense, enteredValue: string) => {
    let value = enteredValue;
    if (option === "date") {
      if (enteredValue.match(/^\d{4}$/) !== null) {
        value = enteredValue + "-";
      } else if (enteredValue.match(/^\d{4}\-\d{2}$/) !== null) {
        value = enteredValue + "-";
      }
    }
    setExpense((expanse) => ({
      ...expanse,
      [option]: {
        isValid: true,
        value,
      },
    }));
  };

  const confirmHandler = () => {
    const priceIsValid = !!checkStringIsPrice(expense.price.value);
    const dateIsValid = !!checkStringIsDate(expense.date.value);
    const textIsValid = !!checkStringIsNotEmpty(expense.text.value);
    setExpense((expense) => {
      return {
        text: {
          ...expense.text,
          isValid: textIsValid,
        },
        price: {
          ...expense.price,
          isValid: priceIsValid,
        },
        date: {
          ...expense.date,
          isValid: dateIsValid,
        },
      };
    });
    if (priceIsValid && dateIsValid && textIsValid) {
      const newExpense = {
        date: expense.date.value,
        text: expense.text.value,
        price: expense.price.value,
      };
      confirmExpense(newExpense);
    }
  };
  const isInvaliData =
    !expense.date.isValid || !expense.text.isValid || !expense.price.isValid;
  return (
    <View style={styles.formStyle}>
      <Input
        label="Price"
        textInputProps={{
          keyboardType: "decimal-pad",
          onChangeText: (text: string) => updateExpenseData("price", text),
        }}
        value={expense.price.value}
        isValid={expense.price.isValid}
      />
      <Input
        label="Description"
        textInputProps={{
          multiline: true,
          onChangeText: (text: string) => updateExpenseData("text", text),
        }}
        value={expense.text.value}
        isValid={expense.text.isValid}
      />
      <Calendar
        date={expense.date.value}
        isValid={expense.date.isValid}
        setDate={(date) => updateExpenseData("date", date)}
      />
      {isInvaliData && (
        <Text style={styles.errorMessage}>
          The data entered is incorrect. Please check your details.
        </Text>
      )}
      <View style={styles.buttonWrapper}>
        <Button style={styles.button} mode="flat" onPress={closeModal}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {confirmLabel}
        </Button>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  button: {
    alignItems: "center",
    minWidth: 150,
    marginHorizontal: 4,
  },
  errorMessage: {
    color: GlobalStyles.colors.error500,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});
