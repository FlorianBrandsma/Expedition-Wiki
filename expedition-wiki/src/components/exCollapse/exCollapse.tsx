import { useState } from 'react';

import { type SxProps, type Theme, IconButton, Box, Typography, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface ExCollapseProps {
  label: string;
  collapseComponent: React.ReactNode;
  isOpen?: boolean;
  sx?: SxProps<Theme>;
}

export default function ExCollapse({ label, collapseComponent, isOpen, sx }: ExCollapseProps) {

  const [open, setOpen] = useState(isOpen);

  return (
    <Box sx={sx}>
      <IconButton
        size="small"
        onClick={() => setOpen(!open)}
        sx={{
          padding: 0,
          borderRadius: 0,
          width: '100%',
          position: 'relative',
          justifyContent: 'center',
          backgroundColor: 'primary.dark'
        }}
      >
        <Box sx={{ position: 'absolute', right: 8, display: 'flex'}}>
          {open ? <KeyboardArrowUpIcon sx={{ color: 'primary.contrastText'}} /> : <KeyboardArrowDownIcon sx={{ color: 'primary.contrastText'}} />}
        </Box>
        <Typography sx={{ color: 'primary.contrastText' }}>{label}</Typography>
      </IconButton>
      <Collapse in={open} unmountOnExit>
        {collapseComponent}
      </Collapse>
    </Box>
  )
}