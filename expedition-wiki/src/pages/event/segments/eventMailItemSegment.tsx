import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { ItemModel } from '../../../data/models/itemModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function EventMailItemSegment() {

  const eventPageModel = useEventPageContext();
    const { itemModelList } = eventPageModel;

  const headers = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      label: 'Item',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignInteractables: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink name={row.name} params={['item', row.name]} />
        </Box>
      )
    },
    {
      id: 'quantity',
      label: 'Quantity',
      align: 'center'
    }
    ], [itemModelList]);

  return (
    <BasicTable rowKey='id' rows={itemModelList} headCells={headers} />
  )
}