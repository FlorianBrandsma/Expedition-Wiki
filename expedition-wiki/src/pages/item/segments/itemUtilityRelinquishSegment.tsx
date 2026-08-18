import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CaseConditionTable from '../../../components/caseConditionTable/caseConditionTable';
import { Box } from '@mui/material';

export default function ItemUtilityRelinquishSegment() {

  const itemPageModel = useItemPageContext();
  const { relinquishItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {

    const headers: HeadCell<ItemEventItemModel>[] = [
      { 
        id: 'itemEventName', 
        label: 'Event', 
        align: 'left'
      },
      {
        id: 'relinquishItemEventItemQuantity',
        label: 'Quantity',
        align: 'right'
      }
    ];

    if (relinquishItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {
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
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={relinquishItemEventItemModelList} headCells={headers} />
    </Box>
  )
}