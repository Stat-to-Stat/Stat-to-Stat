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
          playerStats.seasonTotals[playerStats.seasonTotals.length - 1].season;
        // const playerInfoHelper = playerStats.playerInfo.data.people[0];
        // setPlayer(playerInfoHelper);
        setPlayer(playerStatsHelper);
        setLoading(true);
      } catch (err) {
        setLoading(true);
        setPlayer({});
        // setPlayer({});
      }
    };
    setArrays();
  }, [season]);
  if (loading) {
    try {
      const tableStats = {
        'Games Played': player.gamesPlayed,
        'Games Started': player.gamesStarted,
        'Goals Against Average': player.goalsAgainstAvg.toFixed(2),
        'Shots Against': player.shotsAgainst,
        'Goals Against': player.goalsAgainst,
        Saves: player.shotsAgainst - player.goalsAgainst,
        'Save Percentage': player.savePctg,
        Wins: player.wins,
        Losses: player.losses,
        'Overtime Losses': player.otLosses,
        Shutouts: player.shutouts,
        // 'PowerPlay Saves': player.powerPlaySaves,
        // 'PowerPlay Shots Against': player.powerPlayShots,
      };
      return (
        <div className='each-player-stats'>
          <SeasonFilter setSeason={setSeason} season={season} />
          <div className='player-picture'>
            <img src={player.headshot} alt={player.heroImage} />
          </div>
          <h3>{player.fullName}</h3>
          <h3>
            {Math.floor(player.heightInInches / 12)}Feet{' '}
            {player.heightInInches % 12}Inches
          </h3>
          <h3>{player.weightInPounds}lbs</h3>
          <h3>{player.position}</h3>
          <h3>{player.fullTeamName.default}</h3>
          <h3>{player.currentAge} Years Old</h3>
          <h3>
            From: {player.birthCity.default},{' '}
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
