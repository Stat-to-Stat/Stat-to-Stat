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
  const [player, setPlayer] = useState({});
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
        setPlayer(playerStatsHelper);
      } catch (err) {
        setPlayer({});
      }
      setLoading(true);
    };
    setArrays();
  }, [season]);

  if (loading) {
    try {
      const tableStats = {
        'Games Played': player.games,
        Points: player.points,
        Goals: player.goals,
        Assists: player.assists,
        Shots: player.shots,
        Hits: player.hits,
        'Blocked Shots': player.blocked,
        'Penalty Minutes': player.assists,
        'PowerPlay Goals': player.powerPlayGoals,
        'PowerPlay Points': player.powerPlayPoints,
        'Plus/Minus (+/-)': player.plusMinus,
        'TOI/Per Game': player.timeOnIcePerGame,
      };
      return (
        <div className='each-player-stats'>
          <SeasonFilter setSeason={setSeason} season={season} />
          <div className='player-picture'>
            <img src={player.headshot} alt={`HTTPS issue still persisting`} />
          </div>
          <h3>
            {player.firstName.default} {player.lastName.default}
          </h3>
          <h3>{player.sweaterNumber}</h3>
          <h3>{player.height}</h3>
          <h3>{player.weightInPounds}lbs</h3>
          <h3>Position: {player.position}</h3>
          <h3>{player.fullTeamName.default}</h3>
          <h3>{player.currentAge} Years Old</h3>
          <h3>
            From: {player.birthCity.default},{' '}
            {player.birthStateProvince.default || player.birthCountry}
          </h3>
          <h3>Hand: {player.shootsCatches === 'R' ? 'Right' : 'Left'}</h3>
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
