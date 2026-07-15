import { styled } from '@mui/material/styles';

import CardHeader from '@mui/material/CardHeader';

interface BaseCardHeaderProps {
  title: string
}

function BaseCardHeader({ title, ...props }: BaseCardHeaderProps) {
  return (
    <CardHeader
      {...props}
      title={title}
      slotProps={{
        title: {
          variant: 'body1',
          align: 'center',
          sx: { color: 'primary.contrastText' }
        }
      }}
    />
  );
}

const ExCardHeader = styled(BaseCardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  padding: 1
}));

export default ExCardHeader;