import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemModel } from '../../../data/models/itemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box, Typography } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function ItemSourceSellSegment() {

  const itemPageModel = useItemPageContext();
  const { itemModel, itemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Item', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink pageName={'item'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'baseValue',
      label: 'Quantity',
      align: 'right',
      render: (row) => {

        const value = Math.ceil((itemModel.baseValue / row.baseValue) * 0.5);

        return (
          <Typography variant='body2'>{ value }</Typography>
      )}
    }
  ], [itemPageModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={itemModelList} headCells={headers} />
    </Box>
  )
}