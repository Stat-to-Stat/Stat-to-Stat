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

export const nbaPlayerStatsRetrieval = async (id, currentSeason = 2021) =>
  await axios
    .get(
      `https://www.balldontlie.io/api/v1/season_averages?season=${currentSeason}&player_ids[]=${id}`
    )
    .then((res) => {
      return res;
    });

export const nbaTeamsRetrieval = () => {
  let teamArr = [];
  axios.get('https://www.balldontlie.io/api/v1/teams').then((res) => {
    const teams = res.data.data;
    console.log(res);
    for (const team of teams) {
      let singleTeam = team;
      teamArr.push(singleTeam);
    }
  });
  return teamArr;
};
