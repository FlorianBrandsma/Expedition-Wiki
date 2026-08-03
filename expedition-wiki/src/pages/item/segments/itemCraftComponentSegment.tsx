import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';
import { useItemContext } from '../itemContext';

import { ItemModel } from '../../../data/models/itemModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import { Box } from '@mui/material';

export default function ItemCraftComponentSegment() {

  const { gameModel } = useGameContext();
  const itemModel = useItemContext();

  if (!itemModel) return;

  const headers = useMemo<HeadCell<ItemModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <Link 
            className='link'
            to={`/${gameModel.name}/item/${row.name}`} 
            mask={`/${gameModel.name.replaceAll(' ', '_')}/item/${row.name.replaceAll(' ', '_')}`}
          >
            {row.name}
          </Link>
        </Box>
      )
    },
    {
      id: 'quantity',
      label: 'Quantity',
      align: 'right'
    }
  ], [itemModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={itemModel.componentItemModelList} headCells={headers} />
    </Box>
  )
}