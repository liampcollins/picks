import { USER_LOGGED_IN } from "../actions/types";

const INITIAL_STATE = {
  username: "",
  isSignedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      var isSignedIn = action.payload !== "";
      return { username: action.payload, isSignedIn };
    default:
      return state;
  }
};
