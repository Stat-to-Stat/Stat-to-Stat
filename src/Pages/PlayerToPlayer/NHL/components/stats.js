import React, { useState, useEffect } from 'react';
import NHLPlayerToPlayer from '../../../../Pages/PlayerToPlayer/NHL/index';
import {
  singlePlayerStatRetrieval,
  singleNhlPlayerRetrieval,
} from '../../../../api/nhlApi';

export default function Stats({ id }) {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const setArrays = async () => {
      setStats(await singlePlayerStatRetrieval(8475151));
      setLoading(true);
    };
    setArrays();
  }, []);
  console.log(stats);
  // If player is goalie, displays different stats from regular player (use conditional to determine position status based on API call)
  if (loading) {
    if (stats.playerInfo.data.people[0].primaryPosition.name !== 'Goalie') {
      return (
        <div>
          <div>
            <h4>Image (placeholder)</h4>
            <h3>Name: {stats.playerInfo.data.people[0].fullName}</h3>
            <h3>
              Position: {stats.playerInfo.data.people[0].primaryPosition.name}
            </h3>
            <h3>Team: {stats.playerInfo.data.people[0].currentTeam.name}</h3>
            <h3>Age: {stats.playerInfo.data.people[0].currentAge}</h3>
            <h3>
              Birthplace: {stats.playerInfo.data.people[0].birthCity},{' '}
              {stats.playerInfo.data.people[0].birthStateProvince}
            </h3>
            <h3>Hand: {stats.playerInfo.data.people[0].shootsCatches}</h3>
          </div>
          <h2>
            {stats.playerStats.data.stats[0].splits[0].season} Regular Season
            (Will become a filter feature)
          </h2>
          <div>
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
              Time On Ice Per Game:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.timeOnIcePerGame}
            </h3>
            <h3>
              Shots: {stats.playerStats.data.stats[0].splits[0].stat.shots}
            </h3>
            <h3>Hits: {stats.playerStats.data.stats[0].splits[0].stat.hits}</h3>
          </div>
        </div>
      );
    } else if (
      stats.playerInfo.data.people[0].primaryPosition.name === 'Goalie'
    ) {
      return (
        <div>
          <div>
            <h4>Image (placeholder)</h4>
            <h3>Name: {stats.playerInfo.data.people[0].fullName}</h3>
            <h3>
              Position: {stats.playerInfo.data.people[0].primaryPosition.name}
            </h3>
            <h3>Team: {stats.playerInfo.data.people[0].currentTeam.name}</h3>
            <h3>Age: {stats.playerInfo.data.people[0].currentAge}</h3>
            <h3>
              Birthplace: {stats.playerInfo.data.people[0].birthCity},{' '}
              {stats.playerInfo.data.people[0].birthCountry}
            </h3>
            <h3>Hand: {stats.playerInfo.data.people[0].shootsCatches}</h3>
          </div>
          <h2>
            {stats.playerStats.data.stats[0].splits[0].season} Regular Season
            (Will become a filter feature)
          </h2>
          <div>
            <h3>
              Games Played:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.games}
            </h3>
            <h3>
              Games Started:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.gamesStarted}
            </h3>
            <h3>
              Goals Against Average:{' '}
              {
                stats.playerStats.data.stats[0].splits[0].stat
                  .goalsAgainstAverage
              }
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
              Overtime Losses:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.ot}
            </h3>
            <h3>
              Save Percentage:{' '}
              {stats.playerStats.data.stats[0].splits[0].stat.savePercentage}
            </h3>
            <h3>
              Saves: {stats.playerStats.data.stats[0].splits[0].stat.saves}
            </h3>
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
    }
  } else {
    return <div>Loading</div>;
  }
}
