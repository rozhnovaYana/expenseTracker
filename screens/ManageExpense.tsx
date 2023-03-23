import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthorizedContentList, StackParamList } from "../navigation/types";
import { Expense } from "../types/expenses";
import { CompositeScreenProps } from "@react-navigation/native";

import IconButton from "../components/UI/IconButton";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses/expensesContext";
import { AuthContext } from "../store/auth/authContext";
import Form from "../components/manageExpenses/Form";
import { addExpense, updateExpanse, removeExpense } from "../utils/http";
import Spinner from "../components/UI/Spinner";
import Error from "../components/UI/Error";

type ManageExpenseScreenPrps = CompositeScreenProps<
  NativeStackScreenProps<AuthorizedContentList, "ManageExpense">,
  NativeStackScreenProps<StackParamList>
>;

const ManageExpanse = ({ navigation, route }: ManageExpenseScreenPrps) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const id = route.params?.id;
  const isEditing = !!id;

  const { token } = useContext(AuthContext);

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
  const confirmHandler = async (expense: Expense) => {
    setLoading(true);
    try {
      if (isEditing) {
        await updateExpanse(id, expense, token.token);
        updateItem(id, expense);
      } else {
        const id = await addExpense(expense, token.token);
        addItem({ ...expense, id });
      }
      closeModal();
    } catch (error) {
      setError("Cannot add / update the expense");
    } finally {
      setLoading(false);
    }
  };
  const deleteExpense = async () => {
    try {
      if (!id) return;
      await removeExpense(id);
      removeItem(id);
      closeModal();
    } catch (error) {
      setError("Cannot delete item");
    } finally {
      setLoading(false);
    }
  };
  if (error && !isLoading) return <Error message={error} />;
  if (isLoading) return <Spinner />;
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
