import delay from "./delay";

const teams = [
  {
    name: "dublin",
    teamId: "1"
  },
  {
    name: "wicklow",
    teamId: "2"
  },
  {
    name: "meath",
    teamId: "3"
  },
  {
    name: "kildare",
    teamId: "4"
  },
  {
    name: "cork",
    teamId: "5"
  },
  {
    name: "kerry",
    teamId: "6"
  },
  {
    name: "tipperary",
    teamId: "7"
  },
  {
    name: "limerick",
    teamId: "8"
  }
];

export function getAllTeams() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], teams));
    }, delay);
  });
}
