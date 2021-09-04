import React from 'react';
import NHLPlayerToPlayer from '../../../../Pages/PlayerToPlayer/NHL/index';
import {
  singlePlayerStatRetrieval,
  singleNhlPlayerRetrieval,
} from '../../../../api/nhlApi';

export default function Stats() {
  const playerStats = singlePlayerStatRetrieval();
  const playerInfo = singleNhlPlayerRetrieval();

  // If player is goalie, displays different stats from regular player (use conditional to determine position status based on API call)

  return (
    <div>
      <div>
        <h4>Image (placeholder)</h4>
        <h3>Name:</h3>
        <h3>Position:</h3>
        <h3>Team:</h3>
        <h3>Age:</h3>
        <h3>Birthplace</h3>
        <h3>Hand:</h3>
      </div>
      <div>
        <h3>Games Played:</h3>
        <h3>Points:</h3>
        <h3>Goals:</h3>
        <h3>Assists:</h3>
        <h3>+/-</h3>
        <h3>Time On Ice:</h3>
        <h3>Shots:</h3>
        <h3>Hits:</h3>
      </div>
    </div>
  );
}
