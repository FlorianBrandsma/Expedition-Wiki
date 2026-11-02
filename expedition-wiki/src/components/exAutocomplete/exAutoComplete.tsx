import { alpha } from '@mui/material/styles';
import { Autocomplete, type AutocompleteProps, type SxProps, type Theme } from '@mui/material';

export default function ExAutocomplete<T, Multiple extends boolean | undefined = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false>(props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  
  const paperProps   = props.slotProps?.paper   as { sx?: SxProps<Theme> } | undefined;
  const listboxProps = props.slotProps?.listbox as { sx?: SxProps<Theme> } | undefined;

  return (
    <Autocomplete
      {...props}
      slotProps={{
        ...props.slotProps,
        paper: {
          ...paperProps,
          sx: {
            borderRadius: 0,
            backgroundColor: 'primary.main',
            ...paperProps?.sx
          }
        },
        listbox: {
          ...listboxProps,
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
            },
            ...listboxProps?.sx,
          }
        }
      }}
    />
  );
}