import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { ItemModel } from '../../../data/models/itemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import CellTable from '../../../components/cellTable/cellTable';
import RequiredItem from '../components/requiredItem';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemSourceScrapSegment() {

  const itemPageModel = useItemPageContext();
  const { scrapComponentItemModelList } = itemPageModel;

  const headers = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      id: 'name', 
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
      id: 'itemModelList',
      label: 'Components',
      align: 'left',
      render: (row) => (
        <CellTable 
          list={row.componentItemModelList(row.itemComponentType)} 
          component={(itemModel) => <RequiredItem itemModel={itemModel} />}
        />
      )
    }
  ], [itemPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={scrapComponentItemModelList} headCells={headers} />
    </Box>
  )
}