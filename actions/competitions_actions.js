import { USER_JOIN_COMPETITION, USER_ADD_COMPETITION } from "./types";

export const userAddCompetition = payload => ({
  type: USER_ADD_COMPETITION,
  payload
});

export const userJoinCompetition = payload => ({
  type: USER_JOIN_COMPETITION,
  payload
});
