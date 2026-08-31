import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ShopItemEventModel } from '../../../data/models/shopItemEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box, Typography } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function ItemUtilitySellSegment() {

  const itemPageModel = useItemPageContext();
  const { itemModel, shopItemEventModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ShopItemEventModel>[]>(() => [
    { 
      id: 'eventName', 
      label: 'Event', 
      align: 'left'
    },
    {
      label: 'Value',
      align: 'left',
      render: (row) => {

        const value = (itemModel.baseValue / row.currencyItemBaseValue) * row.rate;

        return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant='body2'>{ value } x</Typography>
          <ExIcon resourceName={row.currencyItemAssetIconResourceName} size={20} />
          <ExLink pageName={'item'} name={row.currencyItemName} />
        </Box>
      )}
    },
    {
      id: 'rateDescription',
      label: 'Rate',
      align: 'center'
    }
  ], [itemPageModel]);

  return (
    <Box>
      <BasicTable rowKey="id" rows={shopItemEventModelList} headCells={headers} />
    </Box>
  )
}