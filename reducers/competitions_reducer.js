import { USER_JOIN_COMPETITION, USER_ADD_COMPETITION } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_JOIN_COMPETITION:
      return state.push(action.payload);
    case USER_ADD_COMPETITION:
      return state.push(action.payload);
    default:
      return state;
  }
};
