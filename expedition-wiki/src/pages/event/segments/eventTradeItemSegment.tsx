import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import { Box, Typography } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';

export default function EventTradeItemSegment() {

  const eventPageModel = useEventPageContext();
  const { itemEventItemModelList } = eventPageModel;

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
      }
    ];

    if (itemEventItemModelList.some(model => model.tradeItemEventItemRelinquishItemModelList.length > 0)) {
  
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
                  <ExLink name={itemModel.name} params={['item', itemModel.name]} />
                </Box>
              )}
            />
          )
        })
      }

    if (itemEventItemModelList.some(model => model.limitedItemEventItemModel)) {

      headers.push({
        id: 'limitedItemEventItemQuantityDescription',
        label: 'Limit',
        align: 'center',
        sx: { whiteSpace: 'normal' }
      })
    }

    if (itemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {
      
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

  }, [eventPageModel]);

  return (
    <BasicTable rowKey="id" rows={itemEventItemModelList} headCells={headers} />
  )
}