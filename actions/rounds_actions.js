import {
  GET_ROUNDS_REQUEST,
  GET_ROUNDS_SUCCESS,
  GET_ROUNDS_FAILURE
} from "./types";
import { getRounds } from "../api/rounds";

export const getRoundsRequest = payload => ({
  type: GET_ROUNDS_REQUEST,
  payload
});

export const getRoundsSuccess = payload => ({
  type: GET_ROUNDS_SUCCESS,
  payload
});

export const getRoundsFailure = payload => ({
  type: GET_ROUNDS_FAILURE,
  payload
});

export const getRounds = competitions => {
  return function(dispatch) {
    dispatch(getRoundsRequest(competitions));
    return getRounds()
      .then(rounds => {
        if (!rounds) return;
        dispatch(getRoundsSuccess(rounds));
      })
      .catch(error => {
        dispatch(getRoundsFailure(error));
        throw error;
      });
  };
};
