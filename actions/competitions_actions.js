import {
  USER_JOIN_COMPETITION,
  USER_ADD_COMPETITION,
  USER__GET_COMPETITIONS
} from "./types";

export const userAddCompetition = payload => ({
  type: USER_ADD_COMPETITION,
  payload
});

export const userJoinCompetition = payload => ({
  type: USER_JOIN_COMPETITION,
  payload
});

export const userGetCompetitions = payload => ({
  type: USER__GET_COMPETITIONS,
  payload
});
