import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';
import PositionPlayers from './PositionPlayers';
import Goalies from './Goalies';

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
  if (loading) {
    if (stats.playerInfo.data.people[0].primaryPosition.name !== 'Goalie') {
      return <PositionPlayers />;
    } else if (
      stats.playerInfo.data.people[0].primaryPosition.name === 'Goalie'
    ) {
      return <Goalies />;
    }
  } else {
    return <div>Loading</div>;
  }
}
