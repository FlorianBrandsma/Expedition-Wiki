import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';
import { useItemContext } from '../itemContext';

import { AbilityModel } from '../../../data/models/abilityModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';

export default function ItemSupplyAbilitySegment() {

  const { gameModel } = useGameContext();
  const { supplyItemModel } = useItemContext();

  if (!supplyItemModel) return;

  const headers = useMemo<HeadCell<AbilityModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <Link 
            className='link'
            to={`/${gameModel.name}/ability/${row.name}`} 
            mask={`/${gameModel.name.replaceAll(' ', '_')}/ability/${row.name.replaceAll(' ', '_')}`}
          >
            {row.name}
          </Link>
        </Box>
      )
    },
    {
      id: 'description',
      label: 'Description',
      align: 'left'
    }
  ], [supplyItemModel]);

  return (
    <Box sx={{ display: 'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={supplyItemModel.abilityModelList} headCells={headers} />
    </Box>
  )
}