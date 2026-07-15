import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';

function BaseCard({ ...props }) {
  return (
    <Card
      {...props}
    />
  );
}

const ExCard = styled(BaseCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light, 
  borderRadius: 0, 
}));

export default ExCard;