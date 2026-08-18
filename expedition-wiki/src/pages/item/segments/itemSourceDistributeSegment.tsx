import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CaseConditionTable from '../../../components/caseConditionTable/caseConditionTable';
import { Box } from '@mui/material';

export default function ItemSourceDistributeSegment() {

  const itemPageModel = useItemPageContext();
  const { sourceDistributeItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {
  
    const headers: HeadCell<ItemEventItemModel>[] = [
      { 
        id: 'itemEventName', 
        label: 'Event', 
        align: 'left'
      },
      {
        id: 'distributeItemEventItemQuantityDescription',
        label: 'Quantity',
        align: 'center'
      }
    ];

    if (sourceDistributeItemEventItemModelList.some(model => model.limitedItemEventItemModel)) {
      headers.push({
        id: 'limitedItemEventItemQuantityDescription',
        label: 'Limit',
        align: 'center'
      })
    }

    if (sourceDistributeItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {
      headers.push({
        id: 'caseConditionModelList',
        label: 'Conditions',
        align: 'left',
        render: (row) => (
          <CaseConditionTable caseConditionModelList={row.caseConditionModelList} />
        )
      })
    }

    return headers;

  }, [itemPageModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={sourceDistributeItemEventItemModelList} headCells={headers} />
    </Box>
  )
}