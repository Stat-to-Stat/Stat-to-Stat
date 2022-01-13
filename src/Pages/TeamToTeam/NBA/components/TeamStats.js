import React, { useState, useEffect } from 'react';
import { singleNbaTeamRetrieval } from '../../../../api/nbaApi';
import SeasonFilter from './SeasonFilter';

export default function TeamStats({ setCurrentTeam, id }) {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [season, setSeason] = useState('2020-2021');

  useEffect(() => {
    const currentSeason = season.replace(/-|\s/g, '').substring(0,4);
    const setArrays = async () => {
      const teamStats = await singleNbaTeamRetrieval(id, currentSeason);
      setStats(teamStats);
      setLoading(true);
    };
    setArrays();
  }, [season]);

  if (!loading) {
    return <div>Loading</div>;
  }

  return (
    <div className='each-team-stats'>
      <SeasonFilter
        setSeason={setSeason}
        season={season}
        startDate={stats.firstYearOfPlay}
      />
      <img
        src={`https://www-league.nbastatic.com/images/logos/teams-current-primary-light/${id}.svg`}
        alt={`No image available`}
        style={{
          width: '170px',
        }}
      />
      <h3>{stats.name}</h3>
      <h3>{stats.nickname}</h3>
      <table className='player-stat-table'>
        <tbody>
          {Object.keys(stats).filter(function(teamStatKeys) {
            let restrictedKeys = ['teamcode', 'teamId', 'abbreviation', 'name', 'nickname'];
            if (restrictedKeys.includes(teamStatKeys)) { return false;} else { return true;}
          }).map((key, i) => {
            return (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? 'player-cell-even' : 'player-cell-odd'
                }`}
              >
                <td>{key.toUpperCase()}</td>
                <td>{stats[key].avg ? stats[key].avg : stats[key]}</td>
                <td>{stats[key].rank ? stats[key].rank : stats[key]}</td>
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
