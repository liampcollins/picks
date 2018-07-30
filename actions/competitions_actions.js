import {
  USER_JOIN_COMPETITION,
  USER_ADD_COMPETITION,
  GET_COMPETITIONS_REQUEST,
  GET_COMPETITIONS_SUCCESS,
  GET_COMPETITIONS_FAILURE
} from "./types";
import { getAllCompetitions } from "../api/competitions";

export const getCompetitionsRequest = payload => ({
  type: GET_COMPETITIONS_REQUEST,
  payload
});

export const getCompetitionsSuccess = payload => ({
  type: GET_COMPETITIONS_SUCCESS,
  payload
});

export const getCompetitionsFailure = payload => ({
  type: GET_COMPETITIONS_FAILURE,
  payload
});

export const getCompetitions = competitions => {
  return function(dispatch) {
    dispatch(getCompetitionsRequest(competitions));
    return getAllCompetitions()
      .then(competitions => {
        if (!competitions) return;
        dispatch(getCompetitionsSuccess(competitions));
      })
      .catch(error => {
        dispatch(getCompetitionsFailure(error));
        throw error;
      });
  };
};

export const userAddCompetition = payload => ({
  type: USER_ADD_COMPETITION,
  payload
});

export const userJoinCompetition = payload => ({
  type: USER_JOIN_COMPETITION,
  payload
});
