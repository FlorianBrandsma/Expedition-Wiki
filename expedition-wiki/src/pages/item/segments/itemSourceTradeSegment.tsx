import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box, Typography } from '@mui/material';

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
        label: 'Relinquish',
        align: 'center',
        render: (row) => (
          <CellTable 
            list={row.tradeItemEventItemRelinquishItemModelList} 
            component={(itemModel) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant='body2'>{itemModel.quantity} x</Typography>
                <ExIcon resourceName={itemModel.assetIconResourceName} size={20} />
                <ExLink pageName={'item'} name={itemModel.name} />
              </Box>
            )}
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
        label: 'Conditions',
        align: 'left',
        sx: { whiteSpace: 'normal' },
        render: (row) => (
          <CellTable 
            bulleted
            list={row.caseConditionModelList} 
            component={(caseConditionModel) => caseConditionModel.descriptionComponent}
          />
        )
      })
    }

    return headers;

  }, [itemPageModel]);

  return (
    <Box>
      <BasicTable rowKey="id" rows={sourceTradeItemEventItemModelList} headCells={headers} />
    </Box>
  )
}