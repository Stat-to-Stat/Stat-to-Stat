import React, { useEffect } from 'react';
import './landing.css';
import axios from 'axios';
import { Title, Sports } from './components';

export default function LandingPage() {
  useEffect(() => {
    let playerArr = [];
    axios
      .get('https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster')
      .then((res) => {
        const teams = res.data.teams;
        for (const team of teams) {
          let players = team.roster.roster;
          for (const player of players) {
            playerArr.push(player.person.fullName);
          }
        }
      });
  }, []);

  return (
    <div className='landing-page-container'>
      <Title />
      <Sports />
    </div>
  );
}
