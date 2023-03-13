import { useContext } from "react";

import { ExpensesContext } from "../store/expensesContext";
import ExpensesOutput from "../components/expenses/ExpensesOutput";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenses}
      period="All expenses"
      fallback="No registered expenses found!"
    />
  );
};

export default AllExpenses;
