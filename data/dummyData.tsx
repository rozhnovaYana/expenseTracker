import { Expense } from "../types/expenses";

const dummyData: Expense[] = [
  {
    id: "c1",
    text: "React Native Course",
    price: "11.99",
    date: new Date("2023-02-01"),
  },
  {
    id: "c2",
    text: "A Christmas Carol",
    price: "10.99",
    date: new Date("2022-12-01"),
  },
  {
    id: "c3",
    text: "Dress",
    price: "45.99",
    date: new Date("2022-01-01"),
  },
  {
    id: "c4",
    text: "Phone",
    price: "779.99",
    date: new Date("2023-03-01"),
  },
];

export default dummyData;