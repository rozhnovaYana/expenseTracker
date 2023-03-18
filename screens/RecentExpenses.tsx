import { useContext } from "react";
import { ExpensesContext } from "../store/expensesContext";
import Spinner from "../components/UI/Spinner";
import Error from "../components/UI/Error";

import ExpensesOutput from "../components/expenses/ExpensesOutput";

const RecentExpenses = () => {
  const { expenses, state } = useContext(ExpensesContext);
  const { isLoading, error } = state;

  if (error && !isLoading) return <Error message={error} />;
  if (isLoading) return <Spinner />;

  const date = new Date();
  const date7DaysAgo = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 7
  );

  const recentExpenses = expenses.filter((expense) => {
    return new Date(expense.date) > date7DaysAgo;
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
