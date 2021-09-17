import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';
import SeasonFilter from './SeasonFilter';

export default function PositionPlayers({ id }) {
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

  // console.log(playerInfo.data.people[0].fullName);
  if (loading) {
    try {
      return (
        <div className='each-player-stats'>
          <h2>
            {stats.playerStats.data.stats[0].splits[0].season} Regular Season
            (will have option to change season)
          </h2>
          <SeasonFilter setSeason={setSeason} season={season} />
          <img
            src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`}
            alt={`Human`}
          />
          <h3>Name: {playerInfo.fullName}</h3>
          <h3>Height: {playerInfo.height}</h3>
          <h3>Weight: {playerInfo.weight}lbs</h3>
          <h3>Position: {playerInfo.primaryPosition.name}</h3>
          <h3>Current Team: {playerInfo.currentTeam.name}</h3>
          <h3>
            DOB: {playerInfo.birthDate} ({playerInfo.currentAge} years old)
          </h3>
          <h3>
            Birthplace: {playerInfo.birthCity}, {playerInfo.birthStateProvince}
          </h3>
          <h3>Hand: {playerInfo.shootsCatches}</h3>
          <h3>Games Played: {playerStats.games}</h3>
          <h3>Points: {playerStats.points}</h3>
          <h3>Goals: {playerStats.goals}</h3>
          <h3>Assists: {playerStats.assists}</h3>
          <h3>Shots: {playerStats.shots}</h3>
          <h3>Hits: {playerStats.hits}</h3>
          <h3>Blocked Shots: {playerStats.blocked}</h3>
          <h3>Penalty Minutes: {playerStats.assists}</h3>
          <h3>PowerPlay Goals: {playerStats.powerPlayGoals}</h3>
          <h3>PowerPlay Points: {playerStats.powerPlayPoints}</h3>
          <h3>Plus/Minus (+/-): {playerStats.plusMinus}</h3>
          <h3>TOI/Per Game: {playerStats.timeOnIcePerGame}</h3>
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
