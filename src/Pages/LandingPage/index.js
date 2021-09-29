import React from 'react';
import './landing.css';
import { Title, Sports } from './components';

export default function LandingPage() {
  return (
    <div className='landing-page-container'>
      <Title />
      <Sports />
    </div>
  );
}
