import { useMemo } from 'react';

import type { ItemModel } from '../../../data/models/itemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

interface InteractableLootTableItemSegmentProps {
  itemModelList: ItemModel[];
}

export default function InteractableLootTableItemSegment({ itemModelList }: InteractableLootTableItemSegmentProps) {

  const headers = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      label: 'Name',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignInteractables: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink name={row.name} params={['item', row.name]} />
        </Box>
      )
    },
    {
      id: 'quantityDescription',
      label: 'Quantity',
      align: 'center'
    },
    {
      id: 'rarityDescription',
      label: 'Rarity',
      align: 'left'
    }
    ], [itemModelList]);

  return (
    <BasicTable rowKey='id' rows={itemModelList} headCells={headers} />
  )
}