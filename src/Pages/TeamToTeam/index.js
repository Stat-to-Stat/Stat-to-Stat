import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import { nhlTeamRetrieval } from '../../../api/nhlApi';
import CompareStats from './components/CompareStats';

export default function NHLTeamToTeam() {
  const [currentTeam, setCurrentTeam] = useState('');

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
      <div>
        <Search
          currentTeam={currentTeam}
          setCurrentTeamOne={setCurrentTeam}
          teamList={teamList}
        />
        <Search
          currentTeam={currentTeam}
          setCurrentTeamTwo={setCurrentTeam}
          teamList={teamList}
        />
        {currentTeam.id ? <CompareStats id={currentTeam.id} /> : null}
      </div>
    );
  } else {
    return <div>LOADING BRO</div>;
  }
}
