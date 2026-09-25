import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box, Link, Typography } from '@mui/material';

export default function ItemSourceCraftSegment() {

  const itemPageModel = useItemPageContext();
  const { sourceCraftItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {
  
    const headers: HeadCell<ItemEventItemModel>[] = [
      { 
        label: 'Event', 
        align: 'left',
        render: (row) => (
          <ExLink name={row.itemEventModel.eventModel.name} params={row.itemEventModel.eventModel.params}/>
        )
      }
    ];

    if (sourceCraftItemEventItemModelList.some(model => model.craftItemEventItemModel.costCraftItemEventItemModel)) {

      headers.push({
        label: 'Cost',
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant='body2'>{ row.costCraftItemEventItemQuantity } x</Typography>
            <ExIcon resourceName={row.costCraftItemEventItemIconResourceName} size={20} />
            <ExLink name={row.costCraftItemEventItemName} params={['item', row.costCraftItemEventItemName]} />
          </Box>
        )
      })
    }

    if (sourceCraftItemEventItemModelList.some(model => model.limitedItemEventItemModel)) {
      
      headers.push({
        id: 'limitedItemEventItemQuantityDescription',
        label: 'Limit',
        align: 'center',
        sx: { whiteSpace: 'normal' }
      })
    }

    if (sourceCraftItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {

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
      <BasicTable rowKey="id" rows={sourceCraftItemEventItemModelList} headCells={headers} />
    </Box>
  )
}