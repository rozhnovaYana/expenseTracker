import { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  AllExpanses: undefined;
  RecentExpanses: undefined;
};

export type AuthParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
};

export type AuthorizedContentList = {
  ExpensesList: NavigatorScreenParams<TabParamList>;
  ManageExpense: {
    id?: string;
  };
};

export type StackParamList = {
  AuthScreen: NavigatorScreenParams<AuthParamList>;
  AuthorizedContent: NavigatorScreenParams<AuthorizedContentList>;
};
