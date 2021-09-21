import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';
import SeasonFilter from './SeasonFilter';

export default function PositionPlayers({ id, setCurrentPlayer }) {
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
      console.log(playerStats);
      try {
        const playerStatsHelper =
          playerStats.playerStats.data.stats[0].splits[0].stat;
        const playerInfoHelper = playerStats.playerInfo.data.people[0];
        setPlayerInfo(playerInfoHelper);
        setPlayerStats(playerStatsHelper);
      } catch (err) {
        console.log("Didn't play in selected season");
        setPlayerInfo({});
        setPlayerStats({});
      }
      setLoading(true);
    };
    setArrays();
  }, [season]);

  if (loading) {
    const tableStats = {
      'Games Played': playerStats.games,
      'Points': playerStats.points,
      'Goals': playerStats.goals,
      'Assists': playerStats.assists,
      'Shots': playerStats.shots,
      'Hits': playerStats.hits,
      'Blocked Shots': playerStats.blocked,
      'Penalty Minutes': playerStats.assists,
      'PowerPlay Goals': playerStats.powerPlayGoals,
      'PowerPlay Points': playerStats.powerPlayPoints,
      'Plus/Minus (+/-)': playerStats.plusMinus,
      'TOI/Per Game': playerStats.timeOnIcePerGame,
    }
    try {
      return (
        <div className='each-player-stats'>
          <SeasonFilter setSeason={setSeason} season={season} />
          <div className='player-picture'>
          <img
            src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`}
            alt={`Human`}
            />
          </div>
          <h3>{playerInfo.fullName}</h3>
          <h3>{playerInfo.height}</h3>
          <h3>{playerInfo.weight}lbs</h3>
          <h3>Position: {playerInfo.primaryPosition.name}</h3>
          <h3>{playerInfo.currentTeam.name}</h3>
          <h3>{playerInfo.currentAge} years old</h3>
          <h3>
            From: {playerInfo.birthCity}, {playerInfo.birthStateProvince}
          </h3>
          <h3>Hand: {playerInfo.shootsCatches == 'R' ? "Right" : "Left"}</h3>
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
        <button onClick={() => {setCurrentPlayer('')}}>Search</button>
    </div>
      );
    } catch (e) {
      console.log(e);
      return <div>Error loading player</div>;
    }
  } else {
    return <div>Loading</div>;
  }
}
