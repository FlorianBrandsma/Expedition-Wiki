import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import { ItemModel } from '../../../data/models/itemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import RequiredItemTable from '../../../components/requiredItemTable/requiredItemTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemUtilityComponentSegment() {

  const itemPageModel = useItemPageContext();
  const { createComponentItemModelList } = itemPageModel;

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
        <RequiredItemTable itemModelList={row.componentItemModelList(row.itemComponentType)} />
      )
    }
  ], [itemPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={createComponentItemModelList} headCells={headers} />
    </Box>
  )
}