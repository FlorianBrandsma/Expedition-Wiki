import { styled, alpha } from '@mui/material/styles';

import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ExTextField from '../exTextField/exTextField';
  
interface BaseFilterSelectionProps {
  label: string
  types: Readonly<Array<string>>
  type: number[]
  setType: React.Dispatch<React.SetStateAction<number[]>>
}

function BaseFilterSelection({ label, types, type, setType, ...props }: BaseFilterSelectionProps) {

  const handleChange = (options:string[]) => {

    /* Convert string to number and sort result to reduce parameter cache pool */
    const typeList: number[] = options.map(option => types.findIndex(type => option == type))
                                      .sort((n1, n2) => n1 - n2);

    setType(typeList);
  }

  return (
    <Autocomplete
      {...props}
      multiple
      options={types}
      value={type.map(type => types[type])}
      disablePortal
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      onChange={(_event, options) => { handleChange(options) }}
      slotProps={{ 
        paper: { 
          sx: { 
            borderRadius: 0, 
            backgroundColor: 'primary.main'
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
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

        return (
          <li key={key} {...optionProps}>
            <SelectionIcon
              fontSize="small"
              style={{ marginRight: 8, padding: 9, boxSizing: 'content-box' }}
            />
            {option}
          </li>
        );
      }}

      renderInput={(params) => (
        <ExTextField {...params} label={label}/>
      )}
    />
  );
}

const ExFilterSelection = styled(BaseFilterSelection)``

export default ExFilterSelection;