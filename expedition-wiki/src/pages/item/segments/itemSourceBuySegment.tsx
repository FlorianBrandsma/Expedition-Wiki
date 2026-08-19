import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box, Typography } from '@mui/material';

export default function ItemSourceBuySegment() {

  const itemPageModel = useItemPageContext();
  const { sourceShopItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {
  
    const headers: HeadCell<ItemEventItemModel>[] = [
      { 
        id: 'itemEventName', 
        label: 'Event', 
        align: 'left'
      },
      {
        id: 'shopItemEventItemValue',
        label: 'Cost',
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant='body2'>{ row.shopItemEventItemValue } x</Typography>
            <ExIcon resourceName={row.shopItemEventItemCurrencyItemIconResourceName} size={20} />
            <ExLink pageName={'item'} name={row.shopItemEventItemCurrencyItemName} />
          </Box>
        )
      },
      {
        id: 'shopItemEventItemRate',
        label: 'Rate',
        align: 'center',
        render: (row) => (
          <>{row.shopItemEventItemRate.toFixed(2)}</>
        )
      }
    ];

    if (sourceShopItemEventItemModelList.some(model => model.limitedItemEventItemModel)) {
      headers.push({
        id: 'limitedItemEventItemQuantityDescription',
        label: 'Limit',
        align: 'center',
        sx: { whiteSpace: 'normal' }
      })
    }

    if (sourceShopItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {
      headers.push({
        id: 'caseConditionModelList',
        label: 'Conditions',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <CellTable 
            bulleted
            list={row.caseConditionModelList} 
            component={(caseConditionModel) => caseConditionModel.descriptionComponent()}
          />
        )
      })
    }

    return headers;

  }, [itemPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={sourceShopItemEventItemModelList} headCells={headers} />
    </Box>
  )
}