import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';

export default function PositionPlayers({ id }) {
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
    try {
      return (
        <div className="each-player-stats">

          <h2>
            {stats.playerStats.data.stats[0].splits[0].season} Regular Season
          </h2>
            <img src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`} alt={`Human`} />
            <h3>Name: {stats.playerInfo.data.people[0].fullName}</h3>
            <h3>Height: {stats.playerInfo.data.people[0].height}</h3>
            <h3>Weight: {stats.playerInfo.data.people[0].weight}lbs</h3>
            <h3>
              Position: {stats.playerInfo.data.people[0].primaryPosition.name}
            </h3>
            <h3>Team: {stats.playerInfo.data.people[0].currentTeam.name}</h3>
            <h3>
              DOB: {stats.playerInfo.data.people[0].birthDate} (
              {stats.playerInfo.data.people[0].currentAge} years old)
            </h3>
            <h3>
              Birthplace: {stats.playerInfo.data.people[0].birthCity},{' '}
              {stats.playerInfo.data.people[0].birthStateProvince}
            </h3>
            <h3>Hand: {stats.playerInfo.data.people[0].shootsCatches}</h3>


            <h3>
              Games Played:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.games}
            </h3>
            <h3>
              Points: {stats.playerStats.data.stats[0].splits[0].stat.points}
            </h3>
            <h3>
              Goals: {stats.playerStats.data.stats[0].splits[0].stat.goals}
            </h3>
            <h3>
              Assists: {stats.playerStats.data.stats[0].splits[0].stat.assists}
            </h3>
            <h3>
              Shots: {stats.playerStats.data.stats[0].splits[0].stat.shots}
            </h3>
            <h3>Hits: {stats.playerStats.data.stats[0].splits[0].stat.hits}</h3>
            <h3>
              Blocked Shots:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.blocked}
            </h3>
            <h3>
              Penalty Minutes:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.assists}
            </h3>
            <h3>
              PowerPlay Goals:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.powerPlayGoals}
            </h3>
            <h3>
              PowerPlay Points:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.powerPlayPoints}
            </h3>
            <h3>
              Plus/Minus (+/-):{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.plusMinus}
            </h3>
            <h3>
              TOI Per Game:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.timeOnIcePerGame}
            </h3>

        </div>
      );
    } catch (error) {
      return <div>ERROR</div>;
    }
  } else {
    return <div>Loading</div>;
  }
}
