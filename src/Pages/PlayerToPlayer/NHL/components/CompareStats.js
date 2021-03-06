import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';
import PositionPlayers from './PositionPlayers';
import Goalies from './Goalies';

export default function CompareStats({setTeam, setPosition, id, setCurrentPlayer }) {
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
    if (stats.playerInfo.data.people[0].primaryPosition.name !== 'Goalie') {
      return <PositionPlayers
        id={id} 
        setCurrentPlayer={setCurrentPlayer}
        setTeam={setTeam}
        setPosition={setPosition}
         />;
    } else if (
      stats.playerInfo.data.people[0].primaryPosition.name === 'Goalie'
    ) {
      return <Goalies 
        id={id} 
        setCurrentPlayer={setCurrentPlayer}
        setTeam={setTeam}
        setPosition={setPosition}
         />;
    }
  } else {
    return <div>Loading</div>;
  }
}
