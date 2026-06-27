import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'

import { styled, alpha } from '@mui/material/styles';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { useGameContext } from '../../../context/gameContext';

import { GameModel } from '../../../data/models/gameModel';
import { GameParameters } from '../../../data/parameters/gameParameters';
import { getData } from '../../../services/dataManager';

function BaseAutoComplete({...props}) {

  const { game } = useGameContext();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<GameModel[]>([]);

  const parameters = new GameParameters({
    releaseCandidateId: [0],
    releaseId:[0]
  });

  const gameQuery = useQuery<GameModel[]>({
    queryKey: ["parameters", parameters],
    queryFn: () => getData(parameters, GameModel),
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

  const handleSelection = (option:GameModel) => {

    /* Open game page on selection */
    navigate(`/${ option.name }`, {
        mask:`/${ option.name.replaceAll(' ', '_')}`
      })
  }

  return (
    <Autocomplete
      {...props}
      disablePortal
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
        },
        listbox: {
          sx: {
            maxHeight: 500,
            scrollbarColor: '#888 #ffffff00',

            '& .MuiAutocomplete-option': {
              '&:hover': {
                backgroundColor: alpha('#000', 0.1)
              }
            },
            "& .MuiAutocomplete-option[aria-selected='true']": {
              backgroundColor: alpha('#000', 0.2),
              "&.Mui-focused": {
                backgroundColor: alpha('#000', 0.3),
              }
            }
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