import React, { useState, useEffect } from 'react';
import { singleTeamRosterRetrieval } from '../../../api/nhlApi';
// import PositionPlayers from './PositionPlayers';
// import Goalies from './Goalies';

export default function CompareStats({ id }) {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const setArrays = async () => {
      setStats(await singleTeamRosterRetrieval(id));
      setLoading(true);
    };
    setArrays();
  }, []);
  console.log(stats);
  if (loading) {
    if (stats.playerInfo.data.people[0].primaryPosition.name !== 'Goalie') {
      return <div>Hi</div>;
    } else if (
      stats.playerInfo.data.people[0].primaryPosition.name === 'Goalie'
    ) {
      return <div>No u</div>;
    }
  } else {
    return <div>Loading</div>;
  }
}
