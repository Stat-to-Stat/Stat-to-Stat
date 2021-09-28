import React, { useState, useEffect } from 'react';
import { singleNhlTeamRetrieval } from '../../../api/nhlApi';
import SeasonFilter from './SeasonFilter';

export default function TeamStats({setCurrentTeam, id }) {
  const [stats, setStats] = useState({});
  const [seasonStats, setSeasonStats] = useState({});
  const [seasonRank, setSeasonRank] = useState({});
  const [loading, setLoading] = useState(false);
  const [season, setSeason] = useState('2020-2021');

  useEffect(() => {
    const currentSeason = season.replace(/-|\s/g, '');
    const setArrays = async () => {
      const teamStats = await singleNhlTeamRetrieval(id, currentSeason);
      setStats(teamStats);
      const seasonStatsHelper = teamStats.teamStats[0].splits[0].stat;
      const seasonRankHelper = teamStats.teamStats[0].splits[1].stat;
      setSeasonStats(seasonStatsHelper);
      setSeasonRank(seasonRankHelper);
      setLoading(true);
    };
    setArrays();
  }, [season]);

  if (!loading) {
    return <div>Loading</div>;
  }

  const gridStatsLayout = {
    Wins: `${seasonStats.wins} (${seasonRank.wins})`,
    Losses: `${seasonStats.losses} (${seasonRank.losses})`,
    'Overtime (losses)': `${seasonStats.ot} (${seasonRank.ot})`,
    'Total Points': `${seasonStats.pts} (${seasonRank.pts})`,
    'Faceoff Win %': `${seasonStats.faceOffWinPercentage} (${seasonRank.faceOffWinPercentage})`,
    'Goals Per Game': `${seasonStats.goalsPerGame.toFixed(1)} (${seasonRank.goalsPerGame})`,
    'Goals Against Per Game': `${seasonStats.goalsAgainstPerGame.toFixed(1)} (${seasonRank.goalsAgainstPerGame})`,
    'Shots Per Game': `${seasonStats.shotsPerGame.toFixed(1)} (${seasonRank.shotsPerGame})`,
    'Shots Allowed Per Game': `${seasonStats.shotsAllowed.toFixed(1)} (${seasonRank.shotsAllowed})`,
    'Power Plays Per Game': `${seasonStats.powerPlayOpportunities} (${seasonRank.powerPlayOpportunities})`,
    'Power Play %': `${seasonStats.powerPlayPercentage} (${seasonRank.powerPlayPercentage})`,
    'Penalty Kill %': `${seasonStats.penaltyKillPercentage} (${seasonRank.penaltyKillPercentage})`,
  };

  return (
    <div className='each-team-stats'>
      <SeasonFilter setSeason={setSeason} season={season} startDate={stats.firstYearOfPlay} />
      <img
        src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg`}
        alt={`Hello`}
        style={{
          width: '170px',
        }}
      />
      <h3>{stats.name}</h3>
      <h3>Divsion: {stats.division.name}</h3>
      <h3>Conference: {stats.conference.name}</h3>
      <h3>First Played: {stats.firstYearOfPlay}</h3>
      <h3>Arena: {stats.venue.name}</h3>
      <h3>City: {stats.venue.city}</h3>
      <table className='player-stat-table'>
        <tbody>
          {Object.keys(gridStatsLayout).map((key, i) => {
            return (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? 'player-cell-even' : 'player-cell-odd'
                }`}
              >
                <td>{key}</td>
                <td>{gridStatsLayout[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
            className='player-text'
            onClick={() => {
              setCurrentTeam('');
            }}
          >
            Search
          </button>
    </div>
  );
}
