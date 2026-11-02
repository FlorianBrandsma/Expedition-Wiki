import { styled } from '@mui/material/styles';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ExTextField from '../exTextField/exTextField';
import ExAutocomplete from '../exAutocomplete/exAutoComplete';
  
interface BaseFilterSelectionProps {
  label: string
  types: Readonly<Array<string>>
  type: number[]
  setType: (type: number[]) => void
}

function BaseFilterSelection({ label, types, type, setType, ...props }: BaseFilterSelectionProps) {

  const handleChange = (options:string[]) => {

    /* Convert string to number and sort result to reduce parameter cache pool */
    const typeList: number[] = options.map(option => types.findIndex(type => option == type))
                                      .sort((n1, n2) => n1 - n2);

    setType(typeList);
  }

  return (
    <ExAutocomplete
      {...props}
      multiple
      options={types}
      value={type.map(type => types[type])}
      disablePortal
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      onChange={(_event, options) => { handleChange(options) }}
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