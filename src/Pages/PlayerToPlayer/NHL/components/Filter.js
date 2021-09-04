import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }));

function Filter({teamList, setTeam, team}) {
    const classes = useStyles();

    const handleChange = (event) => {
        setTeam(event.target.value);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={team}
          onChange={handleChange}
          label="team"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {teamList.map((team, i) => {
              return <MenuItem key={i} value={team.id}><em>{team.name}</em></MenuItem>
          })}
        </Select>
      </FormControl>
    )
}

export default Filter
