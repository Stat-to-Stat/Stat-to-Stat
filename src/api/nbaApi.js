import axios from 'axios';

export const nbaPlayerIdRetrieval = async (name) =>
  await axios
    .get(`https://www.balldontlie.io/api/v1/players?search=${name}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

export const nbaPlayerStatsRetrieval = async (id, currentSeason = 2020) =>
  await axios
    .get(
      `https://www.balldontlie.io/api/v1/season_averages?season=${currentSeason}&player_ids[]=${id}`
    )
    .then((res) => {
      return res;
    });

export const nbaTeamsRetrieval = () => {
  let teamArr = [];
  axios.get('https://data.nba.net/prod/v1/2021/team_stats_rankings.json').then((res) => {
    const teams = res.data.league.standard.regularSeason.teams;
    for (const team of teams) {
      teamArr.push(team);
    }
  });
  return teamArr;
};

export const singleNbaTeamRetrieval = async (id, currentSeason = 2020) => 
  await axios
  .get(`https://data.nba.net/prod/v1/${currentSeason}/team_stats_rankings.json`)
  .then((res) => {
    const teams = res.data.league.standard.regularSeason.teams;
    for (const team of teams) {
      if (team.teamId == id) {
        return team;
      }
    }
  });

