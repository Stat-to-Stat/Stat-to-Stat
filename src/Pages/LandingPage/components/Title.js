import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  nbaPlayerStatsRetrieval,
  nbaPlayerIdRetrieval,
  nbaTeamsRetrieval,
} from '../../../api/nbaApi';

export default function Title() {
  useEffect(() => {
    const setStats = async () => {
      const playerStats = await nbaPlayerStatsRetrieval(246);
      const playerInfo = await nbaPlayerIdRetrieval('Jokic');
      const teamList = await nbaTeamsRetrieval();
      // console.log(playerStats);
      // console.log(playerInfo);
      console.log(teamList);
    };
    setStats();
  });

  return (
    <div className='landing-page-title-container'>
      <div className='Landing-Page-Title--about'>
        <Link to='/aboutus'>
          <button type='submit' className='aboutButton'>
            About Us
          </button>
        </Link>
      </div>
      <div className='Landing-Page-Title'>Stat To Stat</div>
    </div>
  );
}
