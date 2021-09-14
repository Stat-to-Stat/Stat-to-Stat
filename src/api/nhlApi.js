import axios from 'axios';

// All Players
export const nhlPlayerRetrieval = () => {
  let playerArr = [];
  axios
    .get('https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster')
    .then((res) => {
      const teams = res.data.teams;
      for (const team of teams) {
        let players = team.roster.roster;
        for (const player of players) {
          playerArr.push({
            id: player.person.id,
            name: player.person.fullName,
            position: player.position.name,
          });
        }
      }
    });
  return playerArr;
};

// All Teams
export const nhlTeamRetrieval = () => {
  let teamArr = [];
  axios.get('https://statsapi.web.nhl.com/api/v1/teams').then((res) => {
    const teams = res.data.teams;
    for (const team of teams) {
      let singleTeam = team;
      teamArr.push(singleTeam);
    }
  });
  return teamArr;
};

// Single Team
export const singleNhlTeamRetrieval = (id) => {
  return axios
    .get(`https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.stats`)
    .then((res) => {
      return res.data.teams[0];
    });
};
// Single Team Roster
export const singleTeamRosterRetrieval = (id) => {
  let rosterArr = [];
  axios
    .get(`https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.roster`)
    .then((res) => {
      const teamRoster = res.data.teams[0].roster.roster;
      for (const player of teamRoster) {
        rosterArr.push({
          name: player.person.fullName,
          id: player.person.id,
          position: player.position.name
        });
      }
    });
  return rosterArr;
};
// name, venue[name], venue[city], division[name], first year of play, conference[name], officialSiteUrl

// Single Player
export const singleNhlPlayerRetrieval = (id) => {
  let rosterArr = [];
  axios
    .get(`https://statsapi.web.nhl.com/api/v1/people/${id}?expand=team.roster`)
    .then((res) => {
      const teamRoster = res.data.teams.roster;
      for (const players of teamRoster) {
        let names = players.roster.person.fullName;
        rosterArr.push(names);
      }
    });
  console.log(rosterArr);
};
// name, jersey number, position,

// Single Player Stats
export const singlePlayerStatRetrieval = async (id, season = 20202021) => {
  let playerStats = null;
  let playerInfo = null;
  await axios
    .get(
      `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=statsSingleSeason&season=${season}`
    )
    .then((res) => {
      playerStats = res;
    });
  await axios
    .get(`https://statsapi.web.nhl.com/api/v1/people/${id}?expand=team.roster`)
    .then((res) => {
      playerInfo = res;
    });
  return { playerStats, playerInfo };
};
// pretty much every stat that is listed. If they made the postseason, show their postseason stats as well

// Player Images
// nhl.bamcontent.com/images/headshots/current/168x168/8474573.jpg
