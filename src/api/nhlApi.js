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
export const singlePlayerStatRetrieval = async (id, season = 20232024) => {
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

// import jsonp from 'jsonp';
import {
  Skater,
  Goalie,
  SkaterInfo,
  PlayerInfo,
  AllPlayers,
} from "../interfaces/Player";
// import { SkaterInfo } from "../interfaces/PlayerInfo";

const fetchData = async <T>(url: string): Promise<T | T[] | null> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

const fetchSingleData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return <T>{};
  }
};
// Single Player Stats and Bio (Goalies included)

export const getPlayer = async (id, season): Promise => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  season = season == null ? `${currentYear}${previousYear}` : season;
  season = season.replace(/-/g, "");

  console.log(id);
  const player = await fetchSingleData(
    `/api-web/v1/player/${id}/landing?seasonId=${season}`
  );

  if(player != null){
    player.selectedSeason = season;
  }

  return player;
};

export const getAllPlayers = async () => {
  try {
    let players = [];
    const skaters = await fetchData(
      "/api/stats/rest/en/skater/summary?isAggregate=false&isGame=false&limit=-1&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20232024"
    );
    const goalies = await fetchData(
      "/api/stats/rest/en/goalie/summary?isAggregate=false&isGame=false&limit=-1&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20232024"
    );
    const valid = Array.isArray(skaters) && Array.isArray(goalies);
    if (valid) {
      skaters.forEach((skater) => (skater.type = "Skater"));
      goalies.forEach((goalie) => (goalie.type = "Goalie"));
      players = [...(skaters || []), ...(goalies || [])];
    }
    return players;
  } catch (error) {
    console.error("Error fetching player data:", error);
    return [];
  }
};

// // Player Stat Leaders

// export const getPlayerStatLeaders = async (
//   season = 'current',
//   stat,
//   gameType,
//   limit = 10
// ) => {
//   let playerStats = null;
//   await axios
//     .get(
//       `https://api-web.nhle.com/v1/skater-stats-leaders/${season}/${gameType}?categories=${stat}&limit=${limit}`
//     )
//     .then((res) => {
//       playerStats = res;
//     });
//   return playerStats;
// };

// // Goalie Stat Leaders

// export const getGoalieStatLeaders = async (
//   season = 'current',
//   stat,
//   limit = 10
// ) => {
//   let goalieStats = null;
//   await axios
//     .get(
//       `https://api-web.nhle.com/v1/goalie-stats-leaders/${season}?categories=${stat}&limit=${limit}`
//     )
//     .then((res) => {
//       goalieStats = res;
//     });
//   return goalieStats;
// };

// // All Team Stats (Current stats are sorted based on specific stat. Order can be used to determine current league ranking in specific stats)

// export const getTeamStats = async (stat, season = 20232024, gameType = 2) => {
//   let teamStats = null;
//   await axios
//     .get(
//       `https://api.nhle.com/stats/rest/en/team/summary?sort=${stat}&cayenneExp=seasonId=${season}%20and%20gameTypeId=${gameType}`
//     )
//     .then((res) => {
//       teamStats = res.data;
//     });
//   return teamStats;
// };

// // Team List (both active and inactive teams)

// export const getTeamList = async () => {
//   let teams = null;
//   await axios.get('https://api.nhle.com/stats/rest/en/team').then((res) => {
//     teams = res.data;
//   });
//   return teams;
// };

// // Single Team Roster

// export const getTeamRoster = async (TEAM_ABBR, season = 20232024) => {
//   let roster = null;
//   await axios
//     .get(`https://api-web.nhle.com/v1/roster/${TEAM_ABBR}/${season}`)
//     .then((res) => {
//       roster = res;
//     });
//   return roster;
// };

// // Team Seasons (All seasons specific team has participated in)

// export const getTeamSeasons = async (TEAM_ABBR) => {
//   let seasons = null;
//   await axios
//     .get(`https://api-web.nhle.com/v1/roster-season/${TEAM_ABBR}`)
//     .then((res) => {
//       seasons = res;
//     });
//   return seasons;
// };

