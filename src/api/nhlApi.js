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
      teamArr.push(team);
    }
  });
  return teamArr;
};

// Single Team
export const singleNhlTeamRetrieval = (id, season = '2023-2024') => {
  return axios
    .get(
      `https://statsapi.web.nhl.com/api/v1/teams/${id}?expand=team.stats&season=${season}`
    )
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
          position: player.position.name,
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
};

// Single Player Stats
// UPDATE ONCE REGULAR SEASON STARTS!!!!!!!!
export const singlePlayerStatRetrieval = async (
  id = 8471214,
  season = 20232024
) => {
  let player = null;
  // let playerInfo = null;
  await axios
    .get(`https://api-web.nhle.com/v1/player/${id}/landing`)
    .then((res) => {
      player = res;
    });
  return { player };
};

export const singleSeasonRetrieval = async () => {
  let currentSeason = await axios
    .get('https://statsapi.web.nhl.com/api/v1/schedule')
    .then((res) => {
      return res.data.dates[0].games[0].season;
    })
    .catch(() => {
      let currentDate = new Date();
      return currentDate.getFullYear().toString();
    });
  return currentSeason.length === 4 ? currentSeason : currentSeason.slice(4);
};
