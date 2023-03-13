import { useContext } from "react";
import { ExpensesContext } from "../store/expensesContext";

import ExpensesOutput from "../components/expenses/ExpensesOutput";

const RecentExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  const date = new Date();
  const date7DaysAgo = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDay() - 7
  );

  const recentExpenses = expenses.filter((expense) => {
    return expense.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period="RECENTLY"
      fallback="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
