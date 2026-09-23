import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box, Typography } from '@mui/material';

export default function ItemUtilityTradeSegment() {

  const itemPageModel = useItemPageContext();
  const { tradeItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {

    const headers: HeadCell<ItemEventItemModel>[] = [
      { 
        label: 'Item', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExIcon resourceName={row.itemAssetIconResourceName} size={20} />
            <ExLink name={row.itemName} params={['item', row.itemName]} />
          </Box>
        )
      },
      { 
        id: 'itemEventName', 
        label: 'Event', 
        align: 'left'
      },
      {
        label: 'Relinquish',
        align: 'left',
        render: (row) => (
          <CellTable 
            list={row.tradeItemEventItemRelinquishItemModelList} 
            component={(itemModel) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant='body2'>{itemModel.quantity} x</Typography>
                <ExIcon resourceName={itemModel.assetIconResourceName} size={20} />
                <ExLink name={itemModel.name} params={['item', itemModel.name]} />
              </Box>
            )}
          />
        )
      }
    ]

    if (tradeItemEventItemModelList.some(model => model.limitedItemEventItemModel)) {

      headers.push({
        id: 'limitedItemEventItemQuantityDescription',
        label: 'Limit',
        align: 'center',
        sx: { whiteSpace: 'normal' }
      })
    }

    if (tradeItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {

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
      <BasicTable rowKey="id" rows={tradeItemEventItemModelList} headCells={headers} />
    </Box>
  )
}