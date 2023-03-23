import { useContext } from "react";

import { ExpensesContext } from "../store/expenses/expensesContext";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import Spinner from "../components/UI/Spinner";
import Error from "../components/UI/Error";

const AllExpenses = () => {
  const { expenses, state } = useContext(ExpensesContext);
  const { isLoading, error } = state;

  if (error && !isLoading) return <Error message={error} />;
  if (isLoading) return <Spinner />;

  return (
    <ExpensesOutput
      expenses={expenses}
      period="All expenses"
      fallback="No registered expenses found!"
    />
  );
};

export default AllExpenses;
