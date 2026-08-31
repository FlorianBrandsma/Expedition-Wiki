import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { MailEventModel } from '../../../data/models/mailEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
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
      <BasicTable rowKey="id" rows={mailEventModelList} headCells={headers} />
    </Box>
  )
}