import { useEventPageContext } from '../eventPageContext';

import { Box, Typography } from '@mui/material';

export default function EventMailMessageSegment() {

  const { eventModel } = useEventPageContext();
  const { mailEventModel } = eventModel;

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <Typography sx={{ fontStyle: 'italic', textIndent: '2rem' }}>
        {'"'}{mailEventModel.message}{'"'}
      </Typography>
    </Box>
  )
}