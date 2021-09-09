import React, { useState, useEffect } from 'react';
import { singleTeamRosterRetrieval } from '../../../api/nhlApi';

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
    return <div>Hi</div>;
  } else {
    return <div>Loading</div>;
  }
}
