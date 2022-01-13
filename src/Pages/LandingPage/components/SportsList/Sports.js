import React from 'react';
import SingleSport from './SingleSport';

export default function Sports() {
  return (
    <div className='landing-page-sports-container'>
      <SingleSport
        link='/NHL'
        img='NHL'
        finished={true}
        background='/nhlBack'
      />
      <SingleSport link='/NBA' background='/nbaBack' finished={true} img='NBA' />
      <SingleSport background='/nflBack' finished={false} img='NFL' />
      <SingleSport background='/mlbBack' finished={false} img='MLB' />
    </div>
  );
}
