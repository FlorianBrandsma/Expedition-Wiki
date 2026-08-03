import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';
import { useItemContext } from '../itemContext';

import { EquipmentSetModel } from '../../../data/models/equipmentSetModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import { Box } from '@mui/material';

export default function ItemEquipmentSetSegment() {

  const { gameModel } = useGameContext();
  const { equipmentItemModel } = useItemContext();

  if (!equipmentItemModel) return;

  const headers = useMemo<HeadCell<EquipmentSetModel>[]>(() => [
    { 
      id: 'name', 
      label: "Name", 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <Link 
            className='link'
            to={`/${gameModel.name}/set/${row.name}`} 
            mask={`/${gameModel.name.replaceAll(' ', '_')}/set/${row.name.replaceAll(' ', '_')}`}
          >
            {row.name}
          </Link>
        </Box>
      )
    }
  ], [equipmentItemModel]);

  return (
    <Box sx={{ display:'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey="id" rows={equipmentItemModel.equipmentSetModelList} headCells={headers} />
    </Box>
  )
}