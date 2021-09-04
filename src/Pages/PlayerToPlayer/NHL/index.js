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

  const [currentTeam, setCurrentTeam] = useState('');
  const [teamList, setTeamList] = useState([]);

  console.log(currentTeam)
  /*

    const filterPlayerOne = (filterType, Id) => {

        if(filterType == 'team'){
            setCurrentTeam(id)
        }

    }

  */

  const [isLoaded, setIsLoaded] = useState(false);

  const [showFilters, setShowFilters] = useState(false)
  
  useEffect(() => {
    const setArrays = async() => {
        setPlayerList(await nhlPlayerRetrieval());
        setTeamList(await nhlTeamRetrieval())
        setIsLoaded(true)
    }
    setArrays()
}, [])

if(isLoaded){
    return (
        <div>
            {
            showFilters ? 
            <div>
            <button onClick={() => {setShowFilters(false)}}>Filters</button>
            <Filter team={currentTeam} setTeam={setCurrentTeam} teamList={teamList} /> 
            </div>
            : 
            <button onClick={() => {setShowFilters(true)}}>Filters</button>
            }
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
    } else{
        return(
            <div>
                LOADING BRO
            </div>
        )
    }
    }
    
    export default NHLPlayerToPlayer;
    