import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../navigation/types";

import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expensesContext";

type ManageExpenseScreenPrps = NativeStackScreenProps<
  StackParamList,
  "ManageExpense"
>;

const ManageExpanse = ({ navigation, route }: ManageExpenseScreenPrps) => {
  const id = route.params?.id;
  const isEditing = !!id;

  const { removeItem, addItem, updateItem } = useContext(ExpensesContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "CreateExpense",
    });
  }, []);

  const closeModal = () => navigation.goBack();
  const confirmHandler = () => {
    closeModal();
    if(isEditing) {
      updateItem(id, {
        text: "updated",
      })
    } else{
      addItem({
        text: "New item",
        date: new Date(),
        price: '19.00'
      })
    }
  };
  const deleteExpense = () => {
    closeModal();
    if(!id) return;
    removeItem(id);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonWrapper}>
        <Button style={styles.button} mode="flat" onPress={closeModal}>
          Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={confirmHandler}
        >
          {isEditing ? "Edit" : "Add"}
        </Button>
      </View>
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
  deleteButton: {
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.error500,
    marginTop: 25,
    padding: 25,
    alignItems: "center",
    marginHorizontal: 40,
  },
});
