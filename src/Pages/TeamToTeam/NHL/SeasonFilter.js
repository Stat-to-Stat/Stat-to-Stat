import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function generateArrayOfYears() {
  const max = new Date().getFullYear();
  // Update for upcoming NHL season!!!!!
  const min = max - 103;
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
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <h2 id='demo-simple-select-autowidth-label'>Regular Season</h2>
        <Select
          labelId='demo-simple-select-autowidth-label'
          id='demo-simple-select-autowidth'
          value={season}
          onChange={handleChange}
          autoWidth
          label='Age'
        >
          {years.map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
