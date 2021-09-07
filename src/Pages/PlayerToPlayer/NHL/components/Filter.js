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

function Filter({allPlayers, setPlayers, teamList, setTeam, team, singleNhlTeamRoasterRetrieval}) {
    const classes = useStyles();

    const handleChange = async (event) => {
      if(!!event.target.value){
        setTeam(event.target.value);
        const teamsRoaster = (await singleNhlTeamRoasterRetrieval(1))
        setPlayers(teamsRoaster)
      } else {
        setTeam("");
        setPlayers(allPlayers)
      }
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
              return <MenuItem key={i} value={team}><em>{team.name}</em></MenuItem>
          })}
        </Select>
      </FormControl>
    )
}

export default Filter
