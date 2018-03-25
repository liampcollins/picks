import { USER_GET_TEAMS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_GET_TEAMS:
      return action.payload;
    default:
      return state;
  }
};
