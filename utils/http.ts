import axios from "axios";
import { Expense } from "../types/expenses";

const BASE_URL = "https://expenses-66a6a-default-rtdb.firebaseio.com";

export const getItems = async (idToken: string) => {
  const items = await axios.get(`${BASE_URL}/expenses.json?auth=${idToken}`);
  if (!items.data) return [];
  const formattedItems = Object.keys(items.data).map((key: string) => {
    return {
      ...items.data[key],
      id: key,
    };
  });
  return formattedItems;
};

export const addExpense = async (expense: Expense, idToken: string) => {
  const item = await axios.post(
    `${BASE_URL}/expenses.json?auth=${idToken}`,
    expense
  );
  return item.data.name;
};

export const updateExpanse = (
  id: string,
  expense: Expense,
  idToken: string
) => {
  return axios.put(`${BASE_URL}/expenses/${id}.json?auth=${idToken}`, expense);
};

export const removeExpense = (id: string, idToken: string) => {
  return axios.delete(`${BASE_URL}/expenses/${id}.json?auth=${idToken}`);
};
