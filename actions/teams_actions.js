import { USER_GET_TEAMS } from "./types";

export const getTeams = payload => ({
  type: USER_GET_TEAMS,
  payload
});
