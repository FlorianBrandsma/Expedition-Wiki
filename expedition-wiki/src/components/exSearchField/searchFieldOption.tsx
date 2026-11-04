import { Link } from 'react-router-dom';

import { useGameContext } from "../../context/gameContext";

import { getPath } from '../../services/pathManager';

import { WikiSearchResultModel } from '../../data/models/wikiSearchResultModel';

import { ListItem, ListItemText, Button, Typography, Box } from '@mui/material';
import ExIcon from '../exIcon/exIcon';

interface OptionState {
  index: number;
  selected?: boolean;
  inputValue?: string;
}

interface SearchFieldOptionProps {
  optionProps: React.HTMLAttributes<HTMLLIElement>;
  option: WikiSearchResultModel;
  state: OptionState;
  onClickHandler: () => void;
}

export default function SearchFieldOption({ optionProps, option, onClickHandler }: SearchFieldOptionProps) {

  const { gameModel } = useGameContext();

  return (
    <ListItem
      {...optionProps}
      disablePadding 
      sx={{ 
        display: 'flex', 
        alignItems: 'stretch', 
        height: '45px',
        mb: '2px'
      }}
    >
      <Button
        id={`search-btn-${option.key}`}
        component={Link}
        to={getPath(
          gameModel.name, 
          option.params, 
          option.optionalParams
        )}
        onClick={(e) => {
          onClickHandler();
          e.stopPropagation()
        }}
        sx={{ 
          flex: 1, 
          borderRadius: 0,
          transition: 'none',
          textAlign: 'left',
          textTransform: 'none',
          color: (theme) => `${theme.palette.text.primary} !important`,
          background: (theme) => theme.palette.primary.light,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }} 
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {option.iconResourceName && (
            <ExIcon resourceName={option.iconResourceName} size={30} />
          )}
          <ListItemText 
            primary={option.name} 
            secondary={option.description}
          />
        </Box>
        <Typography
          variant='caption'
          sx={{
            fontSize: '0.75rem',
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            marginLeft: 2
          }}
        >
          {option.typeDescription}
        </Typography>
      </Button>
    </ListItem>
  );
}