import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';
import { useGameContext } from '../../context/gameContext';

import { WikiSearchResultParameters } from '../../data/parameters/wikiSearchResultParameters';
import { WikiSearchResultModel } from '../../data/models/wikiSearchResultModel';
import { getData } from '../../services/dataManager';

import { styled, alpha } from '@mui/material/styles';
import { TextField, CircularProgress, IconButton, Box, Button, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import ExAutocomplete from '../exAutocomplete/exAutoComplete';
import SearchFieldOption from './searchFieldOption';
import { getPath } from '../../services/pathManager';

function BlurActiveInput() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

const StyledAutocomplete = styled(ExAutocomplete<WikiSearchResultModel, false, true, false>)(({ theme }) => ({
  width: '100%',

  '& .MuiOutlinedInput-root': {
    position: 'relative',
    padding: theme.spacing(0.5, 1, 0.5, 5),
    color: 'inherit',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: 0,

    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.3)
    },

    '& fieldset': {
      border: 'none'
    }
  },

  '& .MuiInputBase-input': {
    color: 'inherit',
    padding: `${theme.spacing(1, 1, 1, 0)} !important`
  }
}));

interface BaseSearchFieldProps {
  placeholder: string
}

function BaseSearchField({ placeholder, ...props }: BaseSearchFieldProps) {

  const navigate = useNavigate();

  const { gameModel } = useGameContext();

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const debouncedName = useDebounce<string>(inputValue, 250);

  const parameters = new WikiSearchResultParameters({
		gameId: [gameModel.id],
    partialName: debouncedName,
    limit: 10
	});

	const wikiSearchResultQuery = useQuery<WikiSearchResultModel[]>({
		queryKey: ["parameters", parameters],
		queryFn: () => getData(parameters, WikiSearchResultModel),
		enabled: !!debouncedName,
    initialData: []
	});

  const isPanelOpen = inputValue.length > 0 && isFocused;

  const path = getPath(gameModel.name, ['search'], {name: inputValue});

  return (
    <Box 
      {...props}
      sx={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      <Box sx={{
        px: 2,
        py: 0,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <SearchIcon />
      </Box>

      <StyledAutocomplete
        open={isPanelOpen}
        onOpen={() => setIsFocused(true)}
        onClose={() => setIsFocused(false)}
        options={wikiSearchResultQuery.data}
        loading={wikiSearchResultQuery.isLoading}
        clearOnBlur={false}
        popupIcon={null}
        disableClearable={true}
        filterOptions={(x) => x}
        getOptionKey={(option) => option.key}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        onInputChange={(_, newInputValue, reason) => {

          if (reason === 'reset') return;
          
          setInputValue(newInputValue);
        }}

        onChange={(_, option) => {
          if (option) {
            document.getElementById(`search-btn-${option.key}`)?.click();
            
            setInputValue('');
            BlurActiveInput();
          }
        }}

        slots={{
          paper: ({ children, ...paperProps }) => (
            <Paper
              {...paperProps}
              sx={{
                display: 'flex',
                flexDirection: 'column',

                '& .MuiAutocomplete-listbox': {
                  maxHeight: '40vh',
                  overflowY: 'auto'
                }
              }}
            >
              <Box sx={{ flex: 1 }}>
                {children}
              </Box>

              <Button 
                component={Link}
                to={path}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={() => {
                  setInputValue('');
                  BlurActiveInput();
                }}
                sx={{ 
                  mx: 2,
                  my: 1,
                  display: 'flex', 
                  justifyContent: 'center',
                  color: (theme) => `${theme.palette.primary.contrastText} !important`,
                }}
              >
                View All Search Results
              </Button>
            </Paper>
          )
        }}

        slotProps={{
          popper: {
            sx: {
              '& .MuiAutocomplete-option': {

                touchAction: 'pan-y',

                '&:hover, &[aria-selected="true"], &.Mui-focused': {
                  backgroundColor: 'transparent !important',
                },
                '&.Mui-focused .MuiButton-root': {
                  backgroundColor: alpha('#000', 0.05),
                }
              }
            }
          }
        }}

        renderOption={(props, option, state) => {
          const { key, ...optionProps } = props;
          return (
            <SearchFieldOption 
              key={`${key}-${state.index}`}
              optionProps={optionProps}
              option={option}
              state={state}
              onClickHandler={() => {
                setInputValue('')
                BlurActiveInput();
              }}
            />
          );
        }}

        renderInput={(params) => {
          
          const { input, ...slotProps } = params.slotProps || {};

          return (
            <TextField
              {...params}
              placeholder={placeholder}
              variant='outlined'
              onKeyDown={(event) => {
                if (event.key === 'Enter') {

                  navigate(path);

                  setInputValue('');
                  BlurActiveInput();
                }
              }}
              slotProps={{
                ...slotProps,
                input: {
                  ...input,
                  endAdornment: (
                    <>
                      {wikiSearchResultQuery.isFetching && (
                        <CircularProgress color='inherit' size={16} />
                      )}
                      {input?.endAdornment}
                    </>
                  )
                }
              }}
            />
          )
        }}
      />

      <Box sx={{
        px: 1,
        py: 0,
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <IconButton
          color='inherit'
          disabled={inputValue.length === 0}
          onClick={() => setInputValue('')}
        >
          <CloseIcon/>
        </IconButton>
      </Box>
    </Box>
  )
}

const ExSearchField = styled(BaseSearchField)``;
export default ExSearchField;