import {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";

import { Expense } from "../../types/expenses";

import expensesReducer, { ExpensesActionType } from "./expensesReducer";
import { getItems } from "../../utils/http";
import { AuthContext, AuthContextType } from "../auth/authContext";

export interface ExpensesContextType {
  expenses: Expense[];
  addItem: (item: Expense) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<Expense>) => void;
  state: {
    isLoading: boolean;
    error: string | null;
  };
}

interface IExpensesContextProviderProps {
  children: React.ReactNode;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  updateItem: (id, item) => {},
  state: {
    isLoading: true,
    error: null,
  },
});

const ExpensesContextProvider: React.FC<IExpensesContextProviderProps> = ({
  children,
}) => {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext<AuthContextType>(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        if (token.token !== "") {
          const items = await getItems(token.token);
          dispatch({
            type: ExpensesActionType.SET,
            payload: {
              items,
            },
          });
        }
      } catch (error) {
        console.log(error);
        setError("Cannot fetch data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [token]);

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
    state: {
      isLoading,
      error,
    },
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
