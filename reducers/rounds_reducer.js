import { USER_GET_ROUNDS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_GET_ROUNDS:
      return action.payload;
    default:
      return state;
  }
};
