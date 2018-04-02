import { USER_LOGGED_IN } from "../actions/types";

const INITIAL_STATE = {
  username: "",
  id: "",
  isSignedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      const { username, id } = action.payload;
      const isSignedIn = action.payload !== "";
      return { username, id, isSignedIn };
    default:
      return state;
  }
};
