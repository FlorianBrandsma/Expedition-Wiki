import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import RequiredItemTable from '../../../components/requiredItemTable/requiredItemTable';
import CaseConditionTable from '../../../components/caseConditionTable/caseConditionTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemUtilityTradeSegment() {

  const itemPageModel = useItemPageContext();
  const { tradeItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {

    const headers: HeadCell<ItemEventItemModel>[] = [
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
        id: 'itemEventName', 
        label: 'Event', 
        align: 'left'
      },
      {
        id: 'tradeItemEventItemRelinquishItemModelList',
        label: 'Relinquish',
        align: 'left',
        render: (row) => (
          <RequiredItemTable itemModelList={row.tradeItemEventItemRelinquishItemModelList} />
        )
      }
    ]

    if (tradeItemEventItemModelList.some(model => model.limitedItemEventItemModel)) {
      headers.push({
        id: 'limitedItemEventItemQuantityDescription',
        label: 'Limit',
        align: 'center',
        sx: { whiteSpace: 'normal' },
      })
    }

    if (tradeItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {
      headers.push({
        id: 'caseConditionModelList',
        label: 'Conditions',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <CaseConditionTable caseConditionModelList={row.caseConditionModelList} />
        )
      })
    }

    return headers;

  }, [itemPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={tradeItemEventItemModelList} headCells={headers} />
    </Box>
  )
}