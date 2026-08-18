import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CaseConditionTable from '../../../components/caseConditionTable/caseConditionTable';
import { Box, Link, Typography } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function ItemSourceCraftSegment() {

  const itemPageModel = useItemPageContext();
  const { sourceCraftItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {
  
    const headers: HeadCell<ItemEventItemModel>[] = [
      { 
        id: 'itemEventName', 
        label: 'Event', 
        align: 'left'
      }
    ];

    if (sourceCraftItemEventItemModelList.some(model => model.craftItemEventItemModel.costCraftItemEventItemModel)) {
      headers.push({
        id: 'costCraftItemEventItemQuantity',
        label: 'Cost',
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant='body2'>{ row.costCraftItemEventItemQuantity } x</Typography>
            <ExIcon resourceName={row.costCraftItemEventItemIconResourceName} size={20} />
            <ExLink pageName={'item'} name={row.costCraftItemEventItemName} />
          </Box>
        )
      })
    }

    if (sourceCraftItemEventItemModelList.some(model => model.limitedItemEventItemModel)) {
      headers.push({
        id: 'limitedItemEventItemQuantityDescription',
        label: 'Limit',
        align: 'center',
        sx: { whiteSpace: 'normal' },
      })
    }

    if (sourceCraftItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {
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
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <Typography sx={{ fontStyle: 'italic', textIndent: '2rem' }}>
        {'Components: '}
        <Link
          href={`#Create`}
          underline='hover'
        >
          {'Create'}
        </Link>
      </Typography>
      <EnhancedTable rowKey="id" rows={sourceCraftItemEventItemModelList} headCells={headers} />
    </Box>
  )
}