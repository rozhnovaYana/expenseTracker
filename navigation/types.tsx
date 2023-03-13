import { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
    AllExpanses: undefined,
    RecentExpanses: undefined
};

export type StackParamList = {
    ExpensesList:  NavigatorScreenParams<TabParamList>,
    ManageExpense: {
        id?: string
    }
};