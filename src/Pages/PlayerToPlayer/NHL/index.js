import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {
  nhlPlayerRetrieval,
  singlePlayerStatRetrieval,
} from '../../../api/nhlApi';

function NHLPlayerToPlayer() {
  const [currentPlayer, setCurrentPlayer] = useState('');
  const playerList = nhlPlayerRetrieval();

  const selectedPlayer = (event, value) => {
    if (!!value) {
      setCurrentPlayer(value.name);
      return singlePlayerStatRetrieval(value.id);
    } else setCurrentPlayer('');
  };

  return (
    <div>
      <Autocomplete
        id='highlights-demo'
        style={{ width: 300 }}
        onChange={selectedPlayer}
        options={playerList.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        getOptionLabel={(option) => option.name}
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

export default NHLPlayerToPlayer;
