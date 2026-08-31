import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { ItemModel } from '../../../data/models/itemModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box, Typography } from '@mui/material';

export default function ItemSourceScrapSegment() {

  const itemPageModel = useItemPageContext();
  const { scrapComponentItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      label: 'Item', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink pageName={'item'} name={row.name} />
        </Box>
      )
    },
    {
      label: 'Components',
      align: 'left',
      render: (row) => (
        <CellTable 
          list={row.componentItemModelList(row.itemComponentType)} 
          component={(itemModel) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant='body2'>{itemModel.quantity} x</Typography>
              <ExIcon resourceName={itemModel.assetIconResourceName} size={20} />
              <ExLink pageName={'item'} name={itemModel.name} />
            </Box>
          )}
        />
      )
    }
  ], [itemPageModel]);

  return (
    <Box>
      <BasicTable rowKey="id" rows={scrapComponentItemModelList} headCells={headers} />
    </Box>
  )
}