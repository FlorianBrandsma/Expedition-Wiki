import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'

import { styled } from '@mui/material/styles';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { useGameContext } from '../../../context/gameContext';

import type { Game } from '../../../data/types/types';
import { GameParameters } from '../../../data/parameters/parameters';
import { getData } from '../../../services/dataManager';

function BaseAutoComplete({...props}) {

  const { game } = useGameContext();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Game[]>([]);

  const parameters = new GameParameters({
    releaseCandidateId: [0],
    releaseId:[0]
  });

  const gameQuery = useQuery<Game[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData<Game>(parameters),
    enabled: false
  });

  const handleOpen = () => {   
    setOpen(true);
    
    (async () => {     
      const refetchGameQuery = await gameQuery.refetch();

      if (refetchGameQuery.data) 
    	  setOptions(refetchGameQuery.data);

    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleSelection = (option:Game) => {

    /* Open game page on selection */
    navigate(`/${ option.name }`, {
        mask:`/${ option.name.replaceAll(' ', '_')}`
      })
  }

  return (
    <Autocomplete
      {...props}
      disableClearable
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      value={game}
      loading={gameQuery.isLoading}
      onChange={(_event, option) => { handleSelection(option) }}
      slotProps={{ 
        paper: { 
          sx: { 
            borderRadius: 0, 
            color: 'primary.contrastText',
            backgroundColor: 'primary.dark'
          } 
        } 
      }}
      renderOption={(props, option) => {
        return (
          <span {...props} key={ option.id } style={{ borderRadius: 0 }}>{ option.name }</span>
        )
      }}

      renderInput={(params) => (
        <TextField
        {...params}
        slotProps={{
          ...params.slotProps,
          input: {
            ...params.slotProps.input,
            style: { 
              borderRadius: 0,
              color: 'white' 
            },
            endAdornment: (
              <React.Fragment>
                { gameQuery.isLoading ? <CircularProgress color="inherit" size={ 20 } /> : null }
                { params.slotProps.input.endAdornment }
              </React.Fragment>
            )
          },
        }}
        />
      )}
    />
  )
}

const GameAutoComplete = styled(BaseAutoComplete)``;
export default GameAutoComplete;