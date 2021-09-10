import React, { useState, useEffect } from 'react';
import { singleNhlTeamRetrieval } from '../../../api/nhlApi';

export default function TeamStats({ id }) {
  const [stats, setStats] = useState({});
  const [seasonStats, setSeasonStats] = useState({});
  const [seasonRank, setSeasonRank] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setArrays = async () => {
      const teamStats = await singleNhlTeamRetrieval(id);
      setStats(teamStats);
      const seasonStatsHelper = teamStats.teamStats[0].splits[0].stat;
      const seasonRankHelper = teamStats.teamStats[0].splits[1].stat;
      setSeasonStats(seasonStatsHelper);
      setSeasonRank(seasonRankHelper);
      setLoading(true);
    };
    setArrays();
  }, []);

  console.log(stats, 'this is stats');
  if (!loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div>
        <h3>Name: {stats.name}</h3>
        <h3>Divsion: {stats.division.name}</h3>
        <h3>Conference: {stats.conference.name}</h3>
        <h3>First Played: {stats.firstYearOfPlay}</h3>
        <h3>Arena: {stats.venue.name}</h3>
        <h3>City: {stats.venue.city}</h3>
      </div>
      <div>
        <h2>Season Stats (for specified season based on dropdown option)</h2>
        <h3>Games Played: {seasonStats.gamesPlayed}</h3>
        <h3>
          Wins: {seasonStats.wins} ({seasonRank.wins})
        </h3>
        <h3>
          Losses: {seasonStats.losses} ({seasonRank.losses})
        </h3>
        <h3>
          Overtime (losses): {seasonStats.ot} ({seasonRank.ot})
        </h3>
        <h3>
          Total Points: {seasonStats.pts} ({seasonRank.pts})
        </h3>
        <h3>
          Faceoff Win %: {seasonStats.faceOffWinPercentage} (
          {seasonRank.faceOffWinPercentage})
        </h3>
        <h3>
          Goals Per Game: {seasonStats.goalsPerGame.toFixed(1)} (
          {seasonRank.goalsPerGame})
        </h3>
        <h3>
          Goals Against Per Game: {seasonStats.goalsAgainstPerGame.toFixed(1)} (
          {seasonRank.goalsAgainstPerGame})
        </h3>
        <h3>
          Shots Per Game: {seasonStats.shotsPerGame.toFixed(1)} (
          {seasonRank.shotsPerGame})
        </h3>
        <h3>
          Shots Allowed Per Game: {seasonStats.shotsAllowed.toFixed(1)} (
          {seasonRank.shotsAllowed})
        </h3>
        <h3>
          Power Plays Per Game: {seasonStats.powerPlayOpportunities} (
          {seasonRank.powerPlayOpportunities})
        </h3>
        <h3>
          Power Play %: {seasonStats.powerPlayPercentage} (
          {seasonRank.powerPlayPercentage})
        </h3>
        <h3>
          Penalty Kill %: {seasonStats.penaltyKillPercentage} (
          {seasonRank.penaltyKillPercentage})
        </h3>
      </div>
    </div>
  );
}

// powerplay & penalty kill
// PIM per game
// PP per game
// Average Goals per
// Average Goals against
