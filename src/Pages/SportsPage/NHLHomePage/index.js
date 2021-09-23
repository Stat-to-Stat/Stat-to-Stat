import React from 'react';
import './NHL.css';
import { Link } from 'react-router-dom';
import Title from './Components/Title';
import Compare from './Components/Compare';

export default function NHLHomePage() {
  return (
    <div className='nhl-main-container'>
      <Title />
      <Link to='/'>
        <button className='home-button'>Home</button>
      </Link>
      <Compare />
    </div>
  );
}
