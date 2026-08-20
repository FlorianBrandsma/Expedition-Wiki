import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CellTable from '../../../components/cellTable/cellTable';
import { Box, Typography } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function ItemUtilityBuySegment() {

  const itemPageModel = useItemPageContext();
  const { shopItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {
  
    const headers: HeadCell<ItemEventItemModel>[] = [
      { 
        id: 'itemEventName', 
        label: 'Event', 
        align: 'left'
      },
      { 
        id: 'itemName', 
        label: 'Item', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExIcon resourceName={row.itemAssetIconResourceName} size={20} />
            <ExLink pageName={'item'} name={row.itemName} />
          </Box>
        )
      },
      {
        id: 'shopItemEventItemValue',
        label: 'Cost',
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant='body2'>{ row.shopItemEventItemValue } x</Typography>
            <ExIcon resourceName={row.shopItemEventItemCurrencyItemIconResourceName} size={20} />
            <Typography variant='body2'>{row.shopItemEventItemCurrencyItemName}</Typography>
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
    ]

    if (shopItemEventItemModelList.some(model => model.limitedItemEventItemModel)) {
      headers.push({
        id: 'limitedItemEventItemQuantityDescription',
        label: 'Limit',
        align: 'center',
        sx: { whiteSpace: 'normal' }
      })
    }

    if (shopItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {
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
    <Box>
      <EnhancedTable rowKey="id" rows={shopItemEventItemModelList} headCells={headers} />
    </Box>
  )
}