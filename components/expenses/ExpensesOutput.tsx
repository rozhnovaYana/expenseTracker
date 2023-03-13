import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import { Expense } from "../../types/expenses";
import ExpensesHeader from "./ExpensesHeader";

import ExpensesList from "./ExpensesList";

interface IExpensesOutputProps {
  expenses: Expense[];
  period: string;
  fallback: string;
}

const ExpensesOutput: React.FC<IExpensesOutputProps> = ({
  expenses,
  period,
  fallback,
}) => {
  let content = <Text style={styles.text}>{fallback}</Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.wrapper}>
      <ExpensesHeader expenses={expenses} period={period} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  text: {
    color: GlobalStyles.colors.primary50,
    fontSize: 18,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
});
