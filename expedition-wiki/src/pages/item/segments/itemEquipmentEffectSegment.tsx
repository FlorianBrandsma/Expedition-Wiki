import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';
import { useItemContext } from '../itemContext';

import { EffectModel } from '../../../data/models/effectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box, Typography } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';

export default function ItemEquipmentEffectSegment() {

  const { gameModel } = useGameContext();
  const { equipmentItemModel } = useItemContext();

  if (!equipmentItemModel?.armEquipmentItemModel) return;

  const headers = useMemo<HeadCell<EffectModel>[]>(() => [
    { 
      id: 'name', 
      label: "Name", 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <Link 
            className='link'
            to={`/${gameModel.name}/effect/${row.name}`} 
            mask={`/${gameModel.name.replaceAll(' ', '_')}/effect/${row.name.replaceAll(' ', '_')}`}
          >
            {row.name}
          </Link>
        </Box>
      )
    },
    {
      id: 'id',
      label: 'Description',
      align: 'left',
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent()}
        </Box>
      )
    },
    {
      id: 'stack',
      label: 'Stack',
      align: 'center',
      render: (row) => (
        <>
          {`${row.stack}/${row.stackLimit}`}
        </>
      )
    }
  ], [equipmentItemModel]);

  return (
    <Box sx={{ display: 'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={equipmentItemModel.effectModelList} headCells={headers} />
    </Box>
  )
}