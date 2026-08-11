import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { ItemModel } from '../../../data/models/itemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemCraftComponentSegment() {

  const itemPageModel = useItemPageContext();
  const { componentItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink pageName={'item'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'quantity',
      label: 'Quantity',
      align: 'right'
    }
  ], [itemPageModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={componentItemModelList} headCells={headers} />
    </Box>
  )
}