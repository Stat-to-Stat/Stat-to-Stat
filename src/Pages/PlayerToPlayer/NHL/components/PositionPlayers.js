import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';

export default function PositionPlayers({ id }) {
  const [stats, setStats] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});
  const [playerStats, setPlayerStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setArrays = async () => {
      const playerStats = await singlePlayerStatRetrieval(id);
      setStats(playerStats);
      console.log(playerStats);
      try {
        const playerStatsHelper =
          playerStats.playerStats.data.stats[0].splits[0].stat;
        const playerInfoHelper = playerStats.playerInfo.data.people[0];
        setPlayerInfo(playerInfoHelper);
        setPlayerStats(playerStatsHelper);
      } catch (err) {
        console.log("Didn't player current season");
        setPlayerInfo({});
        setPlayerStats({});
      }
      setLoading(true);
    };
    setArrays();
  }, []);

  if (loading) {
    try {
      return (
        <div className='each-player-stats'>
          <h2>
            {stats.playerStats.data.stats[0].splits[0].season} Regular Season
            (will have option to change season)
          </h2>
          <img
            src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`}
            alt={`Human`}
          />
          <h3>Name: {playerInfo.data.people[0].fullName}</h3>
          <h3>Height: {playerInfo.data.people[0].height}</h3>
          <h3>Weight: {playerInfo.data.people[0].weight}lbs</h3>
          <h3>Position: {playerInfo.data.people[0].primaryPosition.name}</h3>
          <h3>Team: {playerInfo.data.people[0].currentTeam.name}</h3>
          <h3>
            DOB: {playerInfo.data.people[0].birthDate} (
            {playerInfo.data.people[0].currentAge} years old)
          </h3>
          <h3>
            Birthplace: {playerInfo.data.people[0].birthCity},{' '}
            {playerInfo.data.people[0].birthStateProvince}
          </h3>
          <h3>Hand: {playerInfo.data.people[0].shootsCatches}</h3>
          <h3>
            Games Played: {playerStats.data.stats[0].splits[0].stat.games}
          </h3>
          <h3>Points: {playerStats.data.stats[0].splits[0].stat.points}</h3>
          <h3>Goals: {playerStats.data.stats[0].splits[0].stat.goals}</h3>
          <h3>Assists: {playerStats.data.stats[0].splits[0].stat.assists}</h3>
          <h3>Shots: {playerStats.data.stats[0].splits[0].stat.shots}</h3>
          <h3>Hits: {playerStats.data.stats[0].splits[0].stat.hits}</h3>
          <h3>
            Blocked Shots: {playerStats.data.stats[0].splits[0].stat.blocked}
          </h3>
          <h3>
            Penalty Minutes: {playerStats.data.stats[0].splits[0].stat.assists}
          </h3>
          <h3>
            PowerPlay Goals:{' '}
            {playerStats.data.stats[0].splits[0].stat.powerPlayGoals}
          </h3>
          <h3>
            PowerPlay Points:{' '}
            {playerStats.data.stats[0].splits[0].stat.powerPlayPoints}
          </h3>
          <h3>
            Plus/Minus (+/-):{' '}
            {playerStats.data.stats[0].splits[0].stat.plusMinus}
          </h3>
          <h3>
            TOI/Per Game:{' '}
            {playerStats.data.stats[0].splits[0].stat.timeOnIcePerGame}
          </h3>
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
