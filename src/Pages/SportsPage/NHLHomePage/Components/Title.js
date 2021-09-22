import React from 'react';
import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <div className='nhl-title'>
      NHL Stat Comparisons
      <Link to='/'>
        <button className='home-button'>Home</button>
      </Link>
    </div>
  );
}
