import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { ItemModel } from '../../../data/models/itemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box, Typography } from '@mui/material';

export default function ItemUtilityComponentSegment() {

  const itemPageModel = useItemPageContext();
  const { createComponentItemModelList, itemModel: itemPageItemModel } = itemPageModel;
  
  const headers = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      label: 'Item', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink name={row.name} params={['item', row.name]} />
        </Box>
      )
    },
    {
      label: 'Components',
      align: 'left',
      render: (row) => (
        <CellTable 
          highlited={(itemModel) => itemModel.id === itemPageItemModel.id}
          list={row.componentItemModelList(row.itemComponentType)} 
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
  ], [itemPageModel]);

  return (
    <Box>
      <BasicTable rowKey="id" rows={createComponentItemModelList} headCells={headers} />
    </Box>
  )
}