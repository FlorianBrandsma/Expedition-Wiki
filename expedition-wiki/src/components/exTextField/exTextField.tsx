import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

interface BaseTextFieldProps {
  label: string
  setValue?: React.Dispatch<React.SetStateAction<string>>
}

function BaseTextField({ label, setValue, ...props }: BaseTextFieldProps) {
  return (
    <TextField
      {...props}
      label={label}
      onChange={(e) => setValue && setValue(e.target.value)}
    />
  );
}

const ExTextField = styled(BaseTextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.primary.dark
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.primary.dark,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: 0
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark,
    }
  }
}));

export default ExTextField;