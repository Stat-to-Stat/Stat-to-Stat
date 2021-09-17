import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';
import SeasonFilter from './SeasonFilter';

export default function Goalies({ id }) {
  const [stats, setStats] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});
  const [playerStats, setPlayerStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [season, setSeason] = useState('2020-2021');

  useEffect(() => {
    const currentSeason = season.replace(/-|\s/g, '');
    const setArrays = async () => {
      const playerStats = await singlePlayerStatRetrieval(id, currentSeason);
      setStats(playerStats);
      const playerStatsHelper =
        playerStats.playerStats.data.stats[0].splits[0].stat;
      const playerInfoHelper = playerStats.playerInfo.data.people[0];
      setPlayerInfo(playerInfoHelper);
      setPlayerStats(playerStatsHelper);
      setLoading(true);
    };
    setArrays();
  }, [season]);

  if (loading) {
    const tableStats = {
      'Games Played': playerStats.games,
      'Games Started': playerStats.gamesStarted,
      'Goals Against Average': playerStats.goalAgainstAverage.toFixed(2),
      'Goals Against': playerStats.goalsAgainst,
      Wins: playerStats.wins,
      Losses: playerStats.losses,
      'Overtime Losses': playerStats.ot,
      'Save Percentage': playerStats.savePercentage,
      Saves: playerStats.saves,
      'Shots Against': playerStats.shotsAgainst,
      'PowerPlay Saves': playerStats.powerPlaySaves,
      'PowerPlay Shots Against': playerStats.powerPlayShots,
    };
    return (
      <div className='each-player-stats'>
        <div>
          <h2>
            {stats.playerStats.data.stats[0].splits[0].season} Regular Season
          </h2>
          <SeasonFilter setSeason={setSeason} season={season} />
          <div className='player-picture'>
            <img
              src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`}
              alt={`Human`}
            />
          </div>
          <h3>Name: {playerInfo.fullName}</h3>
          <h3>Height: {playerInfo.height}</h3>
          <h3>Weight: {playerInfo.weight}lbs</h3>
          <h3>Position: {playerInfo.primaryPosition.name}</h3>
          <h3>Current Team: {playerInfo.currentTeam.name}</h3>
          <h3>
            DOB: {playerInfo.birthDate} ({playerInfo.currentAge} years old)
          </h3>
          <h3>
            Birthplace: {playerInfo.birthCity},{' '}
            {playerInfo.birthStateProvince || playerInfo.birthCountry}
          </h3>
          <h3>Hand: {playerInfo.shootsCatches}</h3>
        </div>
        <div>
          <table className='player-stat-table'>
            <tbody>
              {Object.keys(tableStats).map((key, i) => {
                return (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 0 ? 'player-cell-even' : 'player-cell-odd'
                    }`}
                  >
                    <td>{key}</td>
                    <td>{tableStats[key]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
