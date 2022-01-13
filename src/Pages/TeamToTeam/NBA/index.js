import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import { nbaTeamsRetrieval, singleNbaTeamRetrieval } from '../../../api/nbaApi';
import TeamStats from './components/TeamStats';
import { Link } from 'react-router-dom';
import './style.css';
import '../Shared/teamtoteam.css';
import '../../Common/NBA.css';



export default function NBATeamToTeam() {
  const [currentTeamOne, setCurrentTeamOne] = useState('');

  const [currentTeamTwo, setCurrentTeamTwo] = useState('');

  const [teamList, setTeamList] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const setArrays = async () => {
      const allTeams = await nbaTeamsRetrieval();
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
      <div className='nba-background-image team-to-team-page-container '>
        {currentTeamOne.name || currentTeamTwo.name ? null : (
          <div className='team-to-team-title'>Team to Team</div>
        )}
        <Link to='/'>
          <button className='home-button'>Home</button>
        </Link>
        <div className='team-to-team-teams-container'>
          {currentTeamOne.teamId ? (
            <div
              style={{ backgroundColor: '#8feeffe9' }}
              className='team-to-team-team-stats'
            >
              <TeamStats
                setCurrentTeam={setCurrentTeamOne}
                id={currentTeamOne.teamId}
              />
            </div>
          ) : (
            <div
              style={{ backgroundColor: '#8feeffe9' }}
              className='team-to-team-team-search'
            >
              <Search
                currentTeam={currentTeamOne}
                setCurrentTeam={setCurrentTeamOne}
                teamList={teamList}
              />
            </div>
          )}
          {currentTeamTwo.teamId ? (
            <div
              style={{ backgroundColor: '#c8dbdfe9' }}
              className='team-to-team-team-stats'
            >
              <TeamStats
                setCurrentTeam={setCurrentTeamTwo}
                id={currentTeamTwo.teamId}
              />
            </div>
          ) : (
            <div
              style={{ backgroundColor: '#c8dbdfe9' }}
              className='team-to-team-team-search'
            >
              <Search
                currentTeam={currentTeamTwo}
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
