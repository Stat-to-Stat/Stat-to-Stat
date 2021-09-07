import React, { useState, useEffect } from 'react';
import Search from "./components/Search"
import Filter from "./components/Filter"
import {
    nhlPlayerRetrieval,
    singlePlayerStatRetrieval,
    nhlTeamRetrieval,
    singleNhlTeamRoasterRetrieval,
  } from '../../../api/nhlApi';

function NHLPlayerToPlayer() {
  const [currentPlayerOne, setCurrentPlayerOne] = useState('');
  const [currentPlayerTwo, setCurrentPlayerTwo] = useState('');
  const [allPlayers, setAllPlayers] = useState([]);

  const [filteredPlayers, setFilteredPlayers] = useState([])

  const [currentTeam, setCurrentTeam] = useState('');

  const [teamList, setTeamList] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [showFilters, setShowFilters] = useState(false)
  
  useEffect(() => {
    const setArrays = async() => {
        setTeamList(await nhlTeamRetrieval())
        const playerList = await nhlPlayerRetrieval()
        setAllPlayers(playerList);
        setFilteredPlayers(playerList)
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
            <Filter 
            allPlayers={allPlayers}
            singleNhlTeamRoasterRetrieval={singleNhlTeamRoasterRetrieval}
            setPlayers={setFilteredPlayers} 
            team={currentTeam} 
            setTeam={setCurrentTeam} 
            teamList={teamList} /> 
            </div>
            : 
            <button onClick={() => {setShowFilters(true)}}>Filters</button>
            }
        <Search  
        setCurrentPlayer={setCurrentPlayerOne} 
        playerList={filteredPlayers}
        teamList={teamList}
        />
        <Search  
        setCurrentPlayer={setCurrentPlayerTwo} 
        playerList={filteredPlayers}
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
    