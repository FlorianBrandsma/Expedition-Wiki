import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CellTable from '../../../components/cellTable/cellTable';
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
      <EnhancedTable rowKey="id" rows={relinquishItemEventItemModelList} headCells={headers} />
    </Box>
  )
}