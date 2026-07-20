import { useItemContext } from '../itemContext';

import { Box } from '@mui/material';

export default function ItemEquipmentSegment() {

  const itemModel = useItemContext();

  return (
    <Box sx={{ justifyContent: "left", mt: 5 }}>    
    </Box>
  )
}