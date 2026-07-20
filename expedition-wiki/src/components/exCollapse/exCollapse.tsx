import { useState } from 'react';

import { IconButton, Box, Typography, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface ExCollapseProps {
  label: string;
  collapseComponent: React.ReactNode;
}

export default function ExCollapse(props: ExCollapseProps) {

  const {label, collapseComponent} = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        size="small"
        onClick={() => setOpen(!open)}
        sx={{
          marginTop: 1,
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
    </>
  )
}