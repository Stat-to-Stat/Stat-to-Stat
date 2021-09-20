import React from 'react';
import { Link } from 'react-router-dom';

export default function Title() {
  return (
    <div>
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
