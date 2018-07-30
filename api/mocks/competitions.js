import delay from "./delay";

const competitions = [
  {
    id: 1,
    name: "test1",
    owner: "user1",
    status: 1,
    participants: {
      "1": {
        rounds: [
          {
            id: 1,
            team1: {
              goals: 1,
              points: 10
            },
            team2: {
              goals: 1,
              points: 10
            }
          },
          {
            id: 2,
            team3: {
              goals: 1,
              points: 10
            },
            team4: {
              goals: 1,
              points: 10
            }
          }
        ]
      }
    },
    participantIds: [1, 2, 3]
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

const generateId = competition => {
  return replaceAll(competition.name, " ", "-");
};

export function getAllCompetitions() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], competitions));
    }, delay);
  });
}

export function addCompetition(competition) {
  competition = Object.assign({}, competition);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (competition.id) {
        const existingCompetitionIndex = competitions.findIndex(
          a => a.id === competition.id
        );
        competitions.splice(existingCompetitionIndex, 1, competition);
      } else {
        competition.id = generateId(competition);
        competitions.push(competition);
      }

      resolve(competition);
    }, delay);
  });
}
