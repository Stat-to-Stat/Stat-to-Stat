import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';
import SeasonFilter from './SeasonFilter';

export default function Goalies({
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
        const playerInfoHelper = playerStats.playerInfo.data.people[0];
        setPlayer(playerInfoHelper);
        setPlayer(playerStatsHelper);
        setLoading(true);
      } catch (err) {
        setLoading(true);
        setPlayer({});
        setPlayer({});
      }
    };
    setArrays();
  }, [season]);
  if (loading) {
    try {
      const tableStats = {
        'Games Played': player.games,
        'Games Started': player.gamesStarted,
        'Goals Against Average': player.goalAgainstAverage.toFixed(2),
        'Goals Against': player.goalsAgainst,
        Wins: player.wins,
        Losses: player.losses,
        'Overtime Losses': player.ot,
        'Save Percentage': player.savePercentage,
        Saves: player.saves,
        'Shots Against': player.shotsAgainst,
        'PowerPlay Saves': player.powerPlaySaves,
        'PowerPlay Shots Against': player.powerPlayShots,
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
          <h3>{player.fullName}</h3>
          <h3>{player.height}</h3>
          <h3>{player.weight}lbs</h3>
          <h3>{player.primaryPosition.name}</h3>
          <h3>{player.currentTeam.name}</h3>
          <h3>{player.currentAge} Years Old</h3>
          <h3>
            From: {player.birthCity},{' '}
            {player.birthStateProvince || player.birthCountry}
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
    return <div>Loading</div>;
  }
}
