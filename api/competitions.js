import { API } from "aws-amplify";

const apiName = "CompetitionsCRUD";

export function getAllCompetitions() {
  let path = "/Competitions";
  return API.get(apiName, path);
}
