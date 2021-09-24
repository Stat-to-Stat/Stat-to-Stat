import React from 'react';
import { Link } from 'react-router-dom';
import './error-styles.css';

export default function NotFound() {
  return (
    <div className='error-routing'>
      <h1>Are you sure you thought that one through?</h1>
      <Link to='/'>
        <button className='error-home-button'>Home</button>
      </Link>
    </div>
  );
}
