import React from 'react';
import SingleSport from './SingleSport';

export default function Sports() {
  return (
    <div className='landing-page-sports-container'>
      <SingleSport link='/NHL' img='NHL' finished={true} />
      <SingleSport
        // link='/NBA'
        finished={false}
        img='NBA'
      />
      <SingleSport img='NFL' />
      <SingleSport img='MLB' />
    </div>
  );
}
