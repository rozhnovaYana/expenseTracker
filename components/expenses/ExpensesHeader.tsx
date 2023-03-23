import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import { Expense } from "../../types/expenses";

interface IExpensesHeaderProps {
  expenses: Expense[];
  period: string;
}

const ExpensesHeader: React.FC<IExpensesHeaderProps> = ({
  expenses,
  period,
}) => {
  const totalPrice = expenses.reduce((price: number, current: Expense) => {
    return price + +current.price;
  }, 0);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.periodText}>{period}</Text>
      <Text style={styles.priceText}>${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: GlobalStyles.colors.primary700,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 6,
    elevation: 4,
    shadowColor: GlobalStyles.colors.primary700,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { height: 5, width: 0 },
    alignItems: 'center'
  },
  periodText: {
    color: GlobalStyles.colors.primary50,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
  priceText: {
    color: GlobalStyles.colors.accents500,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
  },
});
