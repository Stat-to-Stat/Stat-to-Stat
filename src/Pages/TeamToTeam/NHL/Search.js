import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

function Search({ currentTeam, teamList, setCurrentTeam }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedTeam = (event, value) => {
    if (!!value) {
      setIsOpen(false);
      setCurrentTeam(value);
    } else setCurrentTeam('');
  };
  return (
    <div className="team-each-search">
      <Autocomplete
        id='highlights-demo'
        style={{ width: 175 }}
        onOpen={() => {
          if (teamList.length < 60) {
            setIsOpen(true);
          }
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        open={isOpen}
        noOptionsText={'No Team Found'}
        onInputChange={(e, v) => {
          if (v.length) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
        onChange={selectedTeam}
        autoSelect={false}
        forcePopupIcon={currentTeam.name ? true : false}
        options={teamList}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Select a Team'
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

export default Search;
