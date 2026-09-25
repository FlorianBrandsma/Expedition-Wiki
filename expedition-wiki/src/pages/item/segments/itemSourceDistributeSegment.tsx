import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { ItemEventItemModel } from '../../../data/models/itemEventItemModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExLink from '../../../components/exLink/exLink';

export default function ItemSourceDistributeSegment() {

  const itemPageModel = useItemPageContext();
  const { sourceDistributeItemEventItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemEventItemModel>[]>(() => {
  
    const headers: HeadCell<ItemEventItemModel>[] = [
      { 
        label: 'Event', 
        align: 'left',
        render: (row) => (
          <ExLink name={row.itemEventModel.eventModel.name} params={row.itemEventModel.eventModel.params}/>
        )
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
        align: 'center',
        sx: { whiteSpace: 'normal' }
      })
    }

    if (sourceDistributeItemEventItemModelList.some(model => model.caseConditionModelList.length > 0)) {

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
      <BasicTable rowKey="id" rows={sourceDistributeItemEventItemModelList} headCells={headers} />
    </Box>
  )
}