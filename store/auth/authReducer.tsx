export enum AuthActionType {
  SET = "SET",
  DELETE = "DELETE",
}

type Set = {
  type: AuthActionType.SET;
  payload: { token: string; expiresIn: string };
};
type Delete = { type: AuthActionType.DELETE; payload: {} };

const authReducer = (
  state: { token: string; expiresIn: string },
  action: Set | Delete
) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.SET:
      return { token: payload.token, expiresIn: payload.expiresIn };
    case AuthActionType.DELETE:
      return { token: "", expiresIn: "0" };
    default:
      return state;
  }
};

export default authReducer;
