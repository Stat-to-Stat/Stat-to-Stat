import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {
  nhlPlayerRetrieval,
  singlePlayerStatRetrieval,
} from '../../../../api/nhlApi';

function Search({currentTeam, playerList, setCurrentPlayer, position}) {
    //   const [sortedPlayers, setSortedPlayers] = useState([]);
      const [isOpen, setIsOpen] = useState(false);
      
    //   useEffect(() => {
    //         const curlist = nhlPlayerRetrieval()
    //         setTimeout(() => {setSortedPlayers(curlist.sort())}, 2000)
          
    // }, [])
    
      const selectedPlayer = (event, value) => {
        if (!!value) {
          setIsOpen(false)
          setCurrentPlayer(value);
        } else setCurrentPlayer('');
      };
      return (
        <div className="player-each-search">
          <Autocomplete
            id='highlights-demo'
            style={{ width: 175 }}
            onOpen={() => {
              if(playerList.length < 60 || position.length > 0){
                setIsOpen(true);
              }
            }}
            onClose={() => {
              setIsOpen(false);
            }}
            open={isOpen}
            noOptionsText={"No Players Found"}
            onInputChange={(e,v) => {
                if(v.length){
                setIsOpen(true)
            } else{
                setIsOpen(false)
            }
            }}
            onChange={selectedPlayer}
            forcePopupIcon={currentTeam.name ? true : position.length > 0 ? true : false}
            options={playerList}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Select a player'
                variant='outlined'
                margin='normal'
              />
            )}
            renderOption={(option, { inputValue }) => {
              const matches = match(option.name, inputValue);
              const parts = parse(option.name, matches);
    
              return (
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              );
            }}
          />
        </div>
      );
}

export default Search
