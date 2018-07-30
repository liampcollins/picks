import delay from "./delay";

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

const rounds = [
  {
    id: 1,
    name: "round1",
    startDate: new Date(),
    status: "1",
    games: [
      {
        id: 1,
        team1: "cork",
        team2: "kerry"
      },
      {
        id: 2,
        team1: "limerick",
        team2: "tipperary"
      }
    ]
  },
  {
    id: 2,
    name: "round2",
    startDate: new Date(),
    status: "1",
    games: [
      {
        id: 3,
        team1: "dublin",
        team2: "wicklow"
      },
      {
        id: 4,
        team1: "meath",
        team2: "kildare"
      }
    ]
  }
];
const generateId = round => {
  return replaceAll(round.name, " ", "-");
};

export function getAllRounds() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], rounds));
    }, delay);
  });
}

export function addRound(round) {
  round = Object.assign({}, round);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (round.id) {
        const existingRoundIndex = rounds.findIndex(a => a.id === round.id);
        rounds.splice(existingRoundIndex, 1, round);
      } else {
        round.id = generateId(round);
        rounds.push(round);
      }

      resolve(round);
    }, delay);
  });
}
