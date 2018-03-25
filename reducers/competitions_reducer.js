import { USER_JOIN_COMPETITION, USER_ADD_COMPETITION, USER_GET_COMPETITIONS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_JOIN_COMPETITION:
      return state.push(action.payload);
    case USER_ADD_COMPETITION:
      return state.push(action.payload);
    case USER_GET_COMPETITIONS:
      return action.payload;
    default:
      return state;
  }
};
