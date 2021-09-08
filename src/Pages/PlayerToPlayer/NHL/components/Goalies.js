import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';

export default function Goalies({ id }) {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const setArrays = async () => {
      setStats(await singlePlayerStatRetrieval(id));
      setLoading(true);
    };
    setArrays();
  }, []);
  if (loading) {
    return (
      <div>
        <div>
          <img src={`https://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`} alt="Human" />
          <h3>Name: {stats.playerInfo.data.people[0].fullName}</h3>
          <h3>
            Position: {stats.playerInfo.data.people[0].primaryPosition.name}
          </h3>
          <h3>Team: {stats.playerInfo.data.people[0].currentTeam.name}</h3>
          <h3>
            Date of Birth: {stats.playerInfo.data.people[0].birthDate} (
            {stats.playerInfo.data.people[0].currentAge} years old)
          </h3>
          <h3>
            Birthplace: {stats.playerInfo.data.people[0].birthCity},{' '}
            {stats.playerInfo.data.people[0].birthCountry}
          </h3>
          <h3>Hand: {stats.playerInfo.data.people[0].shootsCatches}</h3>
        </div>
        <h2>
          {stats.playerStats.data.stats[0].splits[0].season} Regular Season
        </h2>
        <div>
          <h3>
            Games Played: {stats.playerStats.data.stats[0].splits[0].stat.games}
          </h3>
          <h3>
            Games Started:{' '}
            {stats.playerStats.data.stats[0].splits[0].stat.gamesStarted}
          </h3>
          <h3>
            Goals Against Average:{' '}
            {stats.playerStats.data.stats[0].splits[0].stat.goalsAgainstAverage}
          </h3>
          <h3>
            Goals Against:{' '}
            {stats.playerStats.data.stats[0].splits[0].stat.goalsAgainst}
          </h3>
          <h3>Wins: {stats.playerStats.data.stats[0].splits[0].stat.wins}</h3>
          <h3>
            Losses: {stats.playerStats.data.stats[0].splits[0].stat.losses}
          </h3>
          <h3>
            Overtime Losses: {stats.playerStats.data.stats[0].splits[0].stat.ot}
          </h3>
          <h3>
            Save Percentage:{' '}
            {stats.playerStats.data.stats[0].splits[0].stat.savePercentage}
          </h3>
          <h3>Saves: {stats.playerStats.data.stats[0].splits[0].stat.saves}</h3>
          <h3>
            Shots Against:{' '}
            {stats.playerStats.data.stats[0].splits[0].stat.shotsAgainst}
          </h3>
          <h3>
            PowerPlay Saves:{' '}
            {stats.playerStats.data.stats[0].splits[0].stat.powerPlaySaves}
          </h3>
          <h3>
            PowerPlay Shots Against:{' '}
            {stats.playerStats.data.stats[0].splits[0].stat.powerPlayShots}
          </h3>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
