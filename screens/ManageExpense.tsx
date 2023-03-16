import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../navigation/types";
import { Expense } from "../types/expenses";

import IconButton from "../components/UI/IconButton";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expensesContext";
import Form from "../components/manageExpenses/Form";

import { ExpenseInput } from "../components/manageExpenses/Form";
type ManageExpenseScreenPrps = NativeStackScreenProps<
  StackParamList,
  "ManageExpense"
>;

const ManageExpanse = ({ navigation, route }: ManageExpenseScreenPrps) => {
  const id = route.params?.id;
  const isEditing = !!id;

  const { expenses, removeItem, addItem, updateItem } =
    useContext(ExpensesContext);

  const item = expenses.find((expense) => expense.id === id) || {
    price: "",
    text: "",
    date: "",
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "CreateExpense",
    });
  }, []);

  const closeModal = () => navigation.goBack();
  const confirmHandler = (expense: Expense) => {
    closeModal();
    if (isEditing) {
      updateItem(id, expense);
    } else {
      addItem(expense);
    }
  };
  const deleteExpense = () => {
    closeModal();
    if (!id) return;
    removeItem(id);
  };
  return (
    <View style={styles.wrapper}>
      <Form
        confirmLabel={isEditing ? "Edit" : "Add"}
        confirmExpense={confirmHandler}
        closeModal={closeModal}
        initialItem={item}
      />
      {isEditing && (
        <View style={styles.deleteButton}>
          <IconButton
            icon="md-trash-outline"
            color={GlobalStyles.colors.error50}
            size={34}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpanse;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  deleteButton: {
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.error500,
    marginTop: 25,
    padding: 25,
    alignItems: "center",
    marginHorizontal: 40,
  },
});
