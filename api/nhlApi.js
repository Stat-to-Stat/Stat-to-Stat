import axios from 'axios';

export const nhlPlayerRetrieval = () => {
  let playerArr = [];
  axios
    .get('https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster')
    .then((res) => {
      const teams = res.data.teams;
      for (const team of teams) {
        let players = team.roster.roster;
        for (const player of players) {
          playerArr.push(player.person.fullName);
        }
      }
    });
  console.log(playerArr);
};
