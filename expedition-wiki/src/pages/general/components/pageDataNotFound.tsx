import { Box, Typography } from "@mui/material";

export default function PageDataNotFound() {

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Typography variant='h6'>
        404: Data not found
      </Typography>
    </Box>
  )
}