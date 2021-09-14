import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 175,
  },
}));

const positionOptions = [
  "Center",
  "Defenseman",
  "Goalie",
  "Left Wing",
  "Right Wing"
]

function Filter({
  allPlayers,
  setPlayers,
  teamList,
  setTeam,
  team,
  singleTeamRosterRetrieval,
  playerList,
  setPosition,
  position
}) {

  const [showFilters, setShowFilters] = useState(false);

  const classes = useStyles();

  const handleChange = async (event) => {
    if (!!event.target.value) {
      setTeam(event.target.value);
      const teamsRoster = await singleTeamRosterRetrieval(
        event.target.value.id
      );
      setPlayers(teamsRoster);
    } else {
      setTeam('');
      setPlayers(allPlayers);
    }
  };

  const handlePosition = (e) => {
    if(e.target.value){
      const positionedPlayer = []
      for(const player of playerList){
        if(player.position === e.target.value){
          positionedPlayer.push(player)
        }
      }
      setPlayers(positionedPlayer)
      setPosition(e.target.value)
    } else {
      setPosition('');
      setPlayers(allPlayers);
    }
  }

  if(!showFilters){
    return (
    <button
      onClick={() => {
        setShowFilters(true);
      }}
    >
      Filters
    </button>
    )
  }

  return (
    <div className="player-filter">
      <button className="btn btn-filters"
        onClick={() => {
          setShowFilters(false);
        }}
      >
        Filters
      </button>

      {/* Teams */}

      <FormControl variant='outlined' className={classes.formControl}>
      <InputLabel id='demo-simple-select-outlined-label'>Team</InputLabel>
      <Select
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        value={team}
        onChange={handleChange}
        label='team'
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {teamList.map((team, i) => {
          return (
            <MenuItem key={i} value={team}>
              <em>{team.name}</em>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>

    {/* Position */}

      <FormControl variant='outlined' className={classes.formControl}>
      <InputLabel id='demo-simple-select-outlined-label'>Position</InputLabel>
      <Select
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        value={position}
        onChange={handlePosition}
        label='Position'
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {positionOptions.map((team, i) => {
          return (
            <MenuItem key={i} value={team}>
              <em>{team}</em>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>

    </div>
  );
}

export default Filter;