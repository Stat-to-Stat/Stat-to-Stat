import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { singleSeasonRetrieval } from '../../../../api/nhlApi';

function generateArrayOfYears(currentSeason) {
  const max = currentSeason;
  const min = max - 24;
  const years = [];

  for (var i = max; i >= min; i--) {
    years.push(`${i - 1}-${i}`);
  }
  return years;
}

export default function SeasonFilter({ season, setSeason }) {
  const [years, setYears] = useState([]);

  useEffect(() => {
    let getCurrentSeason = async () => {
      let currentSeason = await singleSeasonRetrieval();
      setYears(generateArrayOfYears(currentSeason));
    };
    getCurrentSeason();
  }, []);
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
