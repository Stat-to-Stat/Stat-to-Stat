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

function Filter({
  allPlayers,
  setPlayers,
  teamList,
  setTeam,
  team,
  singleTeamRosterRetrieval,
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
    </div>
  );
}

export default Filter;

// {showFilters ? (
//   <div>
//     <button
//       onClick={() => {
//         setShowFilters(false);
//       }}
//     >
//       Filters
//     </button>
//     <Filter
//       allPlayers={allPlayers}
//       singleTeamRosterRetrieval={singleTeamRosterRetrieval}
//       setPlayers={setFilteredPlayers}
//       team={currentTeam}
//       setTeam={setCurrentTeam}
//       teamList={teamList}
//     />
//   </div>
// ) : (
//   <button
//     onClick={() => {
//       setShowFilters(true);
//     }}
//   >
//     Filters
//   </button>
// )}