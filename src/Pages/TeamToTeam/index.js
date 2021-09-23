import React, { useState, useEffect } from 'react';
import Search from './NHL/Search';
import { nhlTeamRetrieval } from '../../api/nhlApi';
import TeamStats from './NHL/TeamStats';
import { Link } from 'react-router-dom';
import './style.css';

export default function NHLTeamToTeam() {
  const [currentTeam, setCurrentTeam] = useState('');
  const [currentTeamOne, setCurrentTeamOne] = useState('');

  const [currentTeamTwo, setCurrentTeamTwo] = useState('');

  const [teamList, setTeamList] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const setArrays = async () => {
      const allTeams = await nhlTeamRetrieval();
      setTimeout(() => {
        allTeams.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }, 500);
      setTeamList(allTeams);
      setIsLoaded(true);
    };
    setArrays();
  }, []);
  if (isLoaded) {
    return (
      <div className='team-to-team-page-container '>
        <div className='nhl-title'>Team to Team</div>
        <Link to='/'>
          <button className='home-button'>Home</button>
        </Link>
        <div className='nhl-teams-container'>
          {currentTeamOne.id ? (
            <div
              style={{ backgroundColor: '#8feeffe9' }}
              className='nhl-team-stats'
            >
              <TeamStats id={currentTeamOne.id} />
            </div>
          ) : (
            <div
              style={{ backgroundColor: '#8feeffe9' }}
              className='nhl-team-search'
            >
              <Search
                currentTeam={currentTeam}
                setCurrentTeam={setCurrentTeamOne}
                teamList={teamList}
              />
            </div>
          )}
          {currentTeamTwo.id ? (
            <div
              style={{ backgroundColor: '#c8dbdfe9' }}
              className='nhl-team-stats'
            >
              <TeamStats id={currentTeamTwo.id} />
            </div>
          ) : (
            <div
              style={{ backgroundColor: '#c8dbdfe9' }}
              className='nhl-team-search'
            >
              <Search
                currentTeam={currentTeam}
                setCurrentTeam={setCurrentTeamTwo}
                teamList={teamList}
              />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
