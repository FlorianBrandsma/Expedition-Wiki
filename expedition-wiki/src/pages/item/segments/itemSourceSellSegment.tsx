import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemModel } from '../../../data/models/itemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box, Typography } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function ItemSourceSellSegment() {

  const itemPageModel = useItemPageContext();
  const { itemModel, itemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      label: 'Item', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink name={row.name} params={['item', row.name]} />
        </Box>
      )
    },
    {
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
    <Box>
      <BasicTable rowKey="id" rows={itemModelList} headCells={headers} />
    </Box>
  )
}