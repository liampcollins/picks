import { API } from "aws-amplify";

const apiName = "RoundsCRUD";

export function getRounds() {
  let path = "/Rounds";
  return API.get(apiName, path);
}
