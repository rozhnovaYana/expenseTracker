import { Expense } from "../types/expenses";

// action types

export enum ExpensesActionType {
  ADD = "ADD",
  SET = "SER",
  REMOVE = "REMOVE",
  UPDATE = "UPDATE",
}

type Add = { type: ExpensesActionType.ADD; payload: { item: Expense } };
type Set = {
  type: ExpensesActionType.SET;
  payload: {
    items: Expense[];
  };
};
type Update = {
  type: ExpensesActionType.UPDATE;
  payload: { id: string; item: Partial<Expense> };
};
type Remove = { type: ExpensesActionType.REMOVE; payload: { id: string } };

// reducer

const expensesReducer = (
  state: Expense[],
  action: Add | Set | Update | Remove
) => {
  const { type, payload } = action;
  switch (type) {
    case ExpensesActionType.ADD:
      return [{ ...payload.item }, ...state];
    case ExpensesActionType.SET:
      return payload.items.reverse();
    case ExpensesActionType.REMOVE:
      return state.filter((el) => el.id !== payload.id);
    case ExpensesActionType.UPDATE:
      const copiedExpenses = [...state];
      const indexOfItem = state.findIndex(
        (el: Expense) => el.id === payload.id
      );
      const updatedItem = { ...state[indexOfItem], ...payload.item };
      copiedExpenses[indexOfItem] = updatedItem;
      return copiedExpenses;
    default:
      return state;
  }
};

export default expensesReducer;
