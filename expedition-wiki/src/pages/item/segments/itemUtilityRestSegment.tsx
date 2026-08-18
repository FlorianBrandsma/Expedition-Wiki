import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { RestEventModel } from '../../../data/models/restEventModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';

export default function ItemUtilityRestSegment() {

  const itemPageModel = useItemPageContext();
  const { restEventModelList } = itemPageModel;

  const headers = useMemo<HeadCell<RestEventModel>[]>(() => [
    { 
      id: 'eventName', 
      label: 'Event', 
      align: 'left'
    },
    {
      id: 'quantity',
      label: 'Quantity',
      align: 'right',
      render: (row) => (
        <>{row.quantity} / hr</>
      )
    }
  ], [itemPageModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={restEventModelList} headCells={headers} />
    </Box>
  )
}