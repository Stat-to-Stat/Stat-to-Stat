import React from 'react';
import SingleSport from './SingleSport';

export default function Sports() {
  return (
    <div className='landing-page-sports-container'>
      <SingleSport
        link='/NHL'
        img='NHL'
        backgroundColor='hsla(0, 0%, 100%, 0.5)'
      />
      <SingleSport
        // link='/NBA'
        img='NBA'
        backgroundColor='hsla(0, 0%, 100%, 0.5)'
      />
      <SingleSport />
      <SingleSport />
    </div>
  );
}
