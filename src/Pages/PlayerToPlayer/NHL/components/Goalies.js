import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';

export default function Goalies({ id }) {
  const [stats, setStats] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});
  const [playerStats, setPlayerStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setArrays = async () => {
      const playerStats = await singlePlayerStatRetrieval(id);
      setStats(playerStats);
      const playerStatsHelper =
        playerStats.playerStats.data.stats[0].splits[0].stat;
      const playerInfoHelper = playerStats.playerInfo.data.people[0];
      setPlayerInfo(playerInfoHelper);
      setPlayerStats(playerStatsHelper);
      setLoading(true);
    };
    setArrays();
  }, []);
  console.log(playerInfo);
  console.log(playerStats);
  if (loading) {
    return (
      <div className="each-player-stats">
        <div>
          <h2>
            {stats.playerStats.data.stats[0].splits[0].season} Regular Season
          </h2>
          <img
            src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`}
            alt={`Human`}
          />
          <h3>Name: {playerInfo.fullName}</h3>
          <h3>Height: {playerInfo.height}</h3>
          <h3>Weight: {playerInfo.weight}lbs</h3>
          <h3>Position: {playerInfo.primaryPosition.name}</h3>
          <h3>Team: {playerInfo.currentTeam.name}</h3>
          <h3>
            DOB: {playerInfo.birthDate} ({playerInfo.currentAge} years old)
          </h3>
          <h3>
            Birthplace: {playerInfo.birthCity}, {playerInfo.birthCountry}
          </h3>
          <h3>Hand: {playerInfo.shootsCatches}</h3>
        </div>
        <div>
          <h3>Games Played: {playerStats.games}</h3>
          <h3>Games Started: {playerStats.gamesStarted}</h3>
          <h3>
            Goals Against Average: {playerStats.goalAgainstAverage.toFixed(2)}
          </h3>
          <h3>Goals Against: {playerStats.goalsAgainst}</h3>
          <h3>Wins: {playerStats.wins}</h3>
          <h3>Losses: {playerStats.losses}</h3>
          <h3>Overtime Losses: {playerStats.ot}</h3>
          <h3>Save Percentage: {playerStats.savePercentage}</h3>
          <h3>Saves: {playerStats.saves}</h3>
          <h3>Shots Against: {playerStats.shotsAgainst}</h3>
          <h3>PowerPlay Saves: {playerStats.powerPlaySaves}</h3>
          <h3>PowerPlay Shots Against: {playerStats.powerPlayShots}</h3>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
