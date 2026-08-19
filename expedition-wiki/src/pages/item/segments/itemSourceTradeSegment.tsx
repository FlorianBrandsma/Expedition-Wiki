import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CellTable from '../../../components/cellTable/cellTable';
import RequiredItem from '../components/requiredItem';
import { Box } from '@mui/material';

export default function ItemSourceTradeSegment() {

  const itemPageModel = useItemPageContext();
  const { sourceTradeItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {
  
    const headers: HeadCell<ItemEventItemModel>[] = [
      { 
        id: 'itemEventName', 
        label: 'Event', 
        align: 'left'
      }
    ];

    if (sourceTradeItemEventItemModelList.some(model => model.tradeItemEventItemRelinquishItemModelList.length > 0)) {
      headers.push({
        id: 'tradeItemEventItemRelinquishItemModelList',
        label: 'Relinquish',
        align: 'center',
        render: (row) => (
          <CellTable 
            list={row.tradeItemEventItemRelinquishItemModelList} 
            component={(itemModel) => <RequiredItem itemModel={itemModel} />}
          />
        )
      })
    }

    if (sourceTradeItemEventItemModelList.some(model => model.limitedItemEventItemModel)) {
      headers.push({
        id: 'limitedItemEventItemQuantityDescription',
        label: 'Limit',
        align: 'center',
        sx: { whiteSpace: 'normal' }
      })
    }

    if (sourceTradeItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {
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
      <EnhancedTable rowKey="id" rows={sourceTradeItemEventItemModelList} headCells={headers} />
    </Box>
  )
}