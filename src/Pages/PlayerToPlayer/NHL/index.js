import React, { useState, useEffect } from 'react';
import Search from "./components/Search"
import Filter from "./components/Filter"
import {
    nhlPlayerRetrieval,
    singlePlayerStatRetrieval,
    nhlTeamRetrieval,
  } from '../../../api/nhlApi';

function NHLPlayerToPlayer() {
  const [currentPlayerOne, setCurrentPlayerOne] = useState('');
  const [currentPlayerTwo, setCurrentPlayerTwo] = useState('');
  
  const [playerList, setPlayerList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  
  useEffect(() => {
    const setArrays = async() => {
        setPlayerList(await nhlPlayerRetrieval());
        setTeamList(await nhlTeamRetrieval())
    }
    setArrays()
}, [])


  return (
    <div>
        <Filter teamList={teamList} />
        <Search  
        setCurrentPlayer={setCurrentPlayerOne} 
        playerList={playerList}
        teamList={teamList}
        />
        <Search  
        setCurrentPlayer={setCurrentPlayerTwo} 
        playerList={playerList}
        teamList={teamList}
        />
    </div>
      )
}

export default NHLPlayerToPlayer;
