import { Pressable, Text, View, StyleSheet } from "react-native";

import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabParamList, StackParamList } from "../../navigation/types";
import { Expense } from "../../types/expenses";

import { GlobalStyles } from "../../constants/styles";

import { formatDate } from "../../utils/dateFormatter";

interface ExpenseItem {
  item: Expense;
}
type ExpenseItemNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "AllExpanses" | "RecentExpanses">,
  NativeStackScreenProps<StackParamList>
>;
const ExpenseItem: React.FC<ExpenseItem> = ({ item }) => {
  const { id, text, price, date } = item;
  const navigation = useNavigation<ExpenseItemNavigationProp["navigation"]>();
  return (
    <Pressable
      onPress={() => navigation.navigate("ManageExpense", { id })}
      style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.wrapper]}
    >
      <View>
        <Text style={[styles.text, styles.title]}>{text}</Text>
        <Text style={styles.text}>{formatDate(date)}</Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: GlobalStyles.colors.primary50,
    marginVertical: 4,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: GlobalStyles.colors.primary700,
    fontSize: 14,
  },
  price: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: 80,
  },
  priceText: {
    fontFamily: `Montserrat-SemiBold`,
    fontSize: 14,
    color: GlobalStyles.colors.primary50,
    textAlign: "center",
  },
  title: {
    fontFamily: `Montserrat-SemiBold`,
    fontSize: 16,
  },
});
