import React, { useState, useEffect } from 'react';
import Search from './NHL/Search';
import { nhlTeamRetrieval } from '../../api/nhlApi';
import TeamStats from './NHL/TeamStats';

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
      <div>
        {currentTeamOne.id ? (
          <TeamStats id={currentTeamOne.id} />
        ) : (
          <Search
            currentTeam={currentTeam}
            setCurrentTeam={setCurrentTeamOne}
            teamList={teamList}
          />
        )}
        {currentTeamTwo.id ? (
          <TeamStats id={currentTeamTwo.id} />
        ) : (
          <Search
            currentTeam={currentTeam}
            setCurrentTeam={setCurrentTeamTwo}
            teamList={teamList}
          />
        )}
      </div>
    );
  } else {
    return <div>LOADING BRO</div>;
  }
}
