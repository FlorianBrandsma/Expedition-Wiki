import { Box, Divider, Typography } from "@mui/material";

interface PageHeaderProps {
  primaryName: string;
  secondaryName?: string;
}

export default function PageHeader({ primaryName, secondaryName }: PageHeaderProps) {

  return (
    <>
      <Box sx={{ 
        flex: 1, 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <Typography variant="h5">{primaryName}</Typography>
        {secondaryName && (
          <Typography sx={{
            color: 'text.secondary',
            whiteSpace: 'nowrap'
          }}>
            {secondaryName}
          </Typography>
        )}
      </Box>
      <Divider />
    </>
  )
}