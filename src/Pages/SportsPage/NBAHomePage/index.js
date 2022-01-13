import React from 'react';
import '../../Common/NBA.css';
import '../Shared/sportspage.css';
import { Link } from 'react-router-dom';
import Title from './Components/Title';
import Compare from './Components/Compare';

export default function NBAHomePage() {
  return (
    <div className='nba-background-image sportspage-main-container'>
      <Title />
      <Link to='/'>
        <button className='home-button'>Home</button>
      </Link>
      <Compare />
    </div>
  );
}
