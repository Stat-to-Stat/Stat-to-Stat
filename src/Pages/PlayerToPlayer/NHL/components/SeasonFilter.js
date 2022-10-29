import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function generateArrayOfYears() {
  const max = new Date().getFullYear();
  const min = max - 22;
  const years = [];

  for (var i = max; i >= min; i--) {
    years.push(`${i - 1}-${i}`);
  }
  return years;
}

const years = generateArrayOfYears();

export default function SeasonFilter({ season, setSeason }) {
  const handleChange = (event) => {
    setSeason(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <h2>Regular Season</h2>
        <Select value={season} onChange={handleChange}>
          {years.map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
