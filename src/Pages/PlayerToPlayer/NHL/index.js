import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Filter from './components/Filter';
import {
  nhlPlayerRetrieval,
  nhlTeamRetrieval,
  singleTeamRosterRetrieval,
} from '../../../api/nhlApi';
import CompareStats from './components/CompareStats';
import { Link } from 'react-router-dom';

import './style.css';

function NHLPlayerToPlayer() {
  const [currentPlayerOne, setCurrentPlayerOne] = useState('');
  const [currentPlayerTwo, setCurrentPlayerTwo] = useState('');

  const [allPlayers, setAllPlayers] = useState([]);

  const [filteredPlayersOne, setFilteredPlayersOne] = useState([]);
  const [filteredPlayersTwo, setFilteredPlayersTwo] = useState([]);

  const [playerOneTeamRoster, setPlayerOneTeamRoster] = useState([]);
  const [playerTwoTeamRoster, setPlayerTwoTeamRoster] = useState([]);

  const [currentTeamOne, setCurrentTeamOne] = useState('');
  const [currentTeamTwo, setCurrentTeamTwo] = useState('');

  const [currentPostionOne, setCurrentPostionOne] = useState('');
  const [currentPostionTwo, setCurrentPostionTwo] = useState('');

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
      const playerList = await nhlPlayerRetrieval();
      setAllPlayers(playerList);
      setFilteredPlayersOne(playerList);
      setFilteredPlayersTwo(playerList);
      setIsLoaded(true);
    };
    setArrays();
  }, []);

  if (isLoaded) {
    return (
      <div className='nhl-player-page-container'>
        <div className='nhl-title'>Player to Player</div>
        <Link to='/'>
          <button className='home-button'>Home</button>
        </Link>
        <div className='nhl-players-container'>
          {currentPlayerOne.id ? (
            <div
              style={{ backgroundColor: '#8feeffe9' }}
              className='nhl-player-stats'
            >
              <CompareStats
                id={currentPlayerOne.id}
                setCurrentPlayer={setCurrentPlayerOne}
                setTeam={setCurrentTeamOne}
                setPosition={setCurrentPostionOne}
              />
            </div>
          ) : (
            <div
              style={{ backgroundColor: '#8feeffe9' }}
              className='nhl-player-search'
            >
              <Filter
                allPlayers={allPlayers}
                singleTeamRosterRetrieval={singleTeamRosterRetrieval}
                setPlayers={setFilteredPlayersOne}
                setRoster={setPlayerOneTeamRoster}
                roster={playerOneTeamRoster}
                playerList={filteredPlayersOne}
                team={currentTeamOne}
                setTeam={setCurrentTeamOne}
                teamList={teamList}
                setPosition={setCurrentPostionOne}
                position={currentPostionOne}
              />
              <Search
                currentTeam={currentTeamOne}
                setCurrentPlayer={setCurrentPlayerOne}
                playerList={filteredPlayersOne}
                position={currentPostionOne}
                teamList={teamList}
              />
            </div>
          )}
          {currentPlayerTwo.id ? (
            <div
              style={{ backgroundColor: '#c8dbdf6e9' }}
              className='nhl-player-stats'
            >
              <CompareStats
                id={currentPlayerTwo.id}
                setCurrentPlayer={setCurrentPlayerTwo}
                setTeam={setCurrentTeamTwo}
                setPosition={setCurrentPostionTwo}
              />
            </div>
          ) : (
            <div
              style={{ backgroundColor: '#c8dbdfe9' }}
              className='nhl-player-search'
            >
              <Filter
                allPlayers={allPlayers}
                singleTeamRosterRetrieval={singleTeamRosterRetrieval}
                setPlayers={setFilteredPlayersTwo}
                setRoster={setPlayerTwoTeamRoster}
                roster={playerTwoTeamRoster}
                playerList={filteredPlayersTwo}
                team={currentTeamTwo}
                setTeam={setCurrentTeamTwo}
                setPosition={setCurrentPostionTwo}
                position={currentPostionTwo}
                teamList={teamList}
              />
              <Search
                currentTeam={currentTeamTwo}
                setCurrentPlayer={setCurrentPlayerTwo}
                playerList={filteredPlayersTwo}
                position={currentPostionTwo}
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

export default NHLPlayerToPlayer;
