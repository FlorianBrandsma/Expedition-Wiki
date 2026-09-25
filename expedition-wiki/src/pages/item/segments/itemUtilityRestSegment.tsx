import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { RestEventModel } from '../../../data/models/restEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box } from '@mui/material';
import ExLink from '../../../components/exLink/exLink';

export default function ItemUtilityRestSegment() {

  const itemPageModel = useItemPageContext();
  const { restEventModelList } = itemPageModel;

  const headers = useMemo<HeadCell<RestEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
      )
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
    <Box>
      <BasicTable rowKey="id" rows={restEventModelList} headCells={headers} />
    </Box>
  )
}