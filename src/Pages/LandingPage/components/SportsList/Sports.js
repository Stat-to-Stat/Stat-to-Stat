import React from 'react';
import SingleSport from './SingleSport';

export default function Sports() {
  return (
    <div className='landing-page-sports-container'>
      <SingleSport link='/NHL' img='NHL' />
      <SingleSport
        // link='/NBA'
        img='NBA'
      />
      <SingleSport img='NFL' />
      <SingleSport img='MLB' />
    </div>
  );
}
