import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function generateArrayOfYears(startDate) {
  const max = new Date().getFullYear();
  const min = startDate;
  const years = [];

  for (var i = max; i > min; i--) {
    years.push(`${i - 1}-${i}`);
  }
  return years;
}


export default function SeasonFilter({startDate, season, setSeason }) {
  const handleChange = (event) => {
    setSeason(event.target.value);
  };
  const years = generateArrayOfYears(startDate);

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
