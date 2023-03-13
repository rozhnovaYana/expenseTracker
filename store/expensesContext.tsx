import { createContext, useReducer } from "react";

import { Expense } from "../types/expenses";

import expensesReducer, { ExpensesActionType } from "./expensesReducer";
import dummyData from "../data/dummyData";

export interface ExpensesContextType {
  expenses: Expense[];
  addItem: (item: Expense) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<Expense>) => void;
}

interface IExpensesContextProviderProps {
  children: React.ReactNode;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  updateItem: (id, item) => {},
});

const ExpensesContextProvider: React.FC<IExpensesContextProviderProps> = ({
  children,
}) => {
  const [expenses, dispatch] = useReducer(expensesReducer, dummyData);
  const addItem = (item: Expense) => {
    dispatch({
      type: ExpensesActionType.ADD,
      payload: {
        item,
      },
    });
  };

  const removeItem = (id: string) => {
    dispatch({
      type: ExpensesActionType.REMOVE,
      payload: {
        id,
      },
    });
  };

  const updateItem = (id: string, item: Partial<Expense>) => {
    dispatch({
      type: ExpensesActionType.UPDATE,
      payload: {
        id,
        item,
      },
    });
  };
  const value = {
    expenses,
    addItem,
    removeItem,
    updateItem,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
