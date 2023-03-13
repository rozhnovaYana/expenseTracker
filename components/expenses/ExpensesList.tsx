import { FlatList } from "react-native";

import { Expense } from "../../types/expenses";

import ExpenseItem from "./ExpenseItem";

interface IExpensesListProps {
  expenses: Expense[];
}

const ExpensesList: React.FC<IExpensesListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => {
        return <ExpenseItem item={item} />;
      }}
    />
  );
};

export default ExpensesList;
