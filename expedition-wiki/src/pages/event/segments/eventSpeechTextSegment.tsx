import { useEventPageContext } from '../eventPageContext';

import { Box, Typography } from '@mui/material';

export default function EventSpeechTextSegment() {

  const { eventModel } = useEventPageContext();
  const { speechEventModel } = eventModel;

  return (
    <Box sx={{ mx: 4, display: 'inline-block', minWidth: '200px' }}>
      <Typography sx={{ fontStyle: 'italic' }}>
        {'"'}{speechEventModel.textComponent}{'"'}
      </Typography>
    </Box>
  )
}