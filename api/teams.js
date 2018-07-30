import { API } from "aws-amplify";

const apiName = "TeamsCRUD";

export function getTeams() {
  let path = "/Teams";
  return API.get(apiName, path);
}
