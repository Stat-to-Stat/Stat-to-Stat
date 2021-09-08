import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Filter from './components/Filter';
import {
  nhlPlayerRetrieval,
  singlePlayerStatRetrieval,
  nhlTeamRetrieval,
  singleTeamRosterRetrieval,
} from '../../../api/nhlApi';
import CompareStats from './components/CompareStats';

function NHLPlayerToPlayer() {
  const [currentPlayerOne, setCurrentPlayerOne] = useState('');
  const [currentPlayerTwo, setCurrentPlayerTwo] = useState('');

  const [allPlayers, setAllPlayers] = useState([]);

  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const [currentTeam, setCurrentTeam] = useState('');

  const [teamList, setTeamList] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [showFilters, setShowFilters] = useState(false);

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
      const playerList = await nhlPlayerRetrieval();
      setAllPlayers(playerList);
      setFilteredPlayers(playerList);
      setIsLoaded(true);
    };
    setArrays();
  }, []);

  if (isLoaded) {
    return (
      <div>
        {showFilters ? (
          <div>
            <button
              onClick={() => {
                setShowFilters(false);
              }}
            >
              Filters
            </button>
            <Filter
              allPlayers={allPlayers}
              singleTeamRosterRetrieval={singleTeamRosterRetrieval}
              setPlayers={setFilteredPlayers}
              team={currentTeam}
              setTeam={setCurrentTeam}
              teamList={teamList}
            />
          </div>
        ) : (
          <button
            onClick={() => {
              setShowFilters(true);
            }}
          >
            Filters
          </button>
        )}
        <Search
          currentTeam={currentTeam}
          setCurrentPlayer={setCurrentPlayerOne}
          playerList={filteredPlayers}
          teamList={teamList}
        />
        <Search
          currentTeam={currentTeam}
          setCurrentPlayer={setCurrentPlayerTwo}
          playerList={filteredPlayers}
          teamList={teamList}
        />
        {currentPlayerOne.id ? <CompareStats id={currentPlayerOne.id} /> : null}
      </div>
    );
  } else {
    return <div>LOADING BRO</div>;
  }
}

export default NHLPlayerToPlayer;
