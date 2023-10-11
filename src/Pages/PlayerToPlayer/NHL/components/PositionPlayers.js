import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';
import SeasonFilter from './SeasonFilter';

export default function PositionPlayers({
  setTeam,
  setPosition,
  id,
  setCurrentPlayer,
}) {
  const [stats, setStats] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});
  const [playerStats, setPlayerStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [season, setSeason] = useState('2023-2024');

  useEffect(() => {
    const currentSeason = season.replace(/-|\s/g, '');
    const setArrays = async () => {
      const playerStats = await singlePlayerStatRetrieval(id, currentSeason);
      setStats(playerStats);
      try {
        const playerStatsHelper =
          playerStats.playerStats.data.stats[0].splits[0].stat;
        const playerInfoHelper = playerStats.playerInfo.data.people[0];
        setPlayerInfo(playerInfoHelper);
        setPlayerStats(playerStatsHelper);
      } catch (err) {
        setPlayerInfo({});
        setPlayerStats({});
      }
      setLoading(true);
    };
    setArrays();
  }, [season]);

  if (loading) {
    try {
      const tableStats = {
        'Games Played': playerStats.games,
        Points: playerStats.points,
        Goals: playerStats.goals,
        Assists: playerStats.assists,
        Shots: playerStats.shots,
        Hits: playerStats.hits,
        'Blocked Shots': playerStats.blocked,
        'Penalty Minutes': playerStats.assists,
        'PowerPlay Goals': playerStats.powerPlayGoals,
        'PowerPlay Points': playerStats.powerPlayPoints,
        'Plus/Minus (+/-)': playerStats.plusMinus,
        'TOI/Per Game': playerStats.timeOnIcePerGame,
      };
      return (
        <div className='each-player-stats'>
          <SeasonFilter setSeason={setSeason} season={season} />
          <div className='player-picture'>
            <img
              src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}@2x.jpg`}
              alt={`HTTPS issue still persisting`}
            />
          </div>
          <h3>{playerInfo.fullName}</h3>
          <h3>{playerInfo.height}</h3>
          <h3>{playerInfo.weight}lbs</h3>
          <h3>Position: {playerInfo.primaryPosition.name}</h3>
          <h3>{playerInfo.currentTeam.name}</h3>
          <h3>{playerInfo.currentAge} Years Old</h3>
          <h3>
            From: {playerInfo.birthCity},{' '}
            {playerInfo.birthStateProvince || playerInfo.birthCountry}
          </h3>
          <h3>Hand: {playerInfo.shootsCatches === 'R' ? 'Right' : 'Left'}</h3>
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
          <button
            className='player-text'
            onClick={() => {
              setCurrentPlayer('');
              setTeam('');
              setPosition('');
            }}
          >
            New Player
          </button>
        </div>
      );
    } catch {
      return (
        <div className='player-text'>
          Player did not play in the selected season or is entering their rookie
          season. Please try again
          <button
            className='player-text'
            onClick={() => {
              setCurrentPlayer('');
              setTeam('');
              setPosition('');
            }}
          >
            Search
          </button>
        </div>
      );
    }
  } else {
    return <div className='player-text'>Loading</div>;
  }
}
