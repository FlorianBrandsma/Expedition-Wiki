import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';
import { useItemContext } from '../itemContext';

import { ItemComponentModel } from '../../../data/models/itemComponentModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import { Box } from '@mui/material';

interface ItemCraftSegmentProps {
  itemComponentModelList: ItemComponentModel[];
}

export default function ItemCraftSegment(props: ItemCraftSegmentProps) {

  const { gameModel } = useGameContext();
  const itemModel = useItemContext();

  if (!itemModel) return;

  const headers = useMemo<HeadCell<ItemComponentModel>[]>(() => [
    { 
      id: 'componentItemName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.componentItemAssetIconResourceName} size={20} />
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
      <EnhancedTable rowKey="id" rows={props.itemComponentModelList} headCells={headers} />
    </Box>
  )
}