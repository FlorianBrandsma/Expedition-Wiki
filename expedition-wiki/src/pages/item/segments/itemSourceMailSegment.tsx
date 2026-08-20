import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { MailEventModel } from '../../../data/models/mailEventModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';

export default function ItemSourceMailSegment() {

  const itemPageModel = useItemPageContext();
  const { mailEventModelList } = itemPageModel;

  const headers = useMemo<HeadCell<MailEventModel>[]>(() => [
    { 
      id: 'eventName', 
      label: 'Event', 
      align: 'left'
    },
    {
      id: 'itemQuantity',
      label: 'Quantity',
      align: 'right'
    }
  ], [itemPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey="id" rows={mailEventModelList} headCells={headers} />
    </Box>
  )
}