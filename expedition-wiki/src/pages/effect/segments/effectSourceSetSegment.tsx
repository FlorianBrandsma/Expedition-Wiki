import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { EquipmentSetModel } from '../../../data/models/equipmentSetModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceSetSegment() {

  const effectPageModel = useEffectPageContext();
  const { equipmentSetModelList } = effectPageModel;

  const headers = useMemo<HeadCell<EquipmentSetModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignEffects: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'set'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'statusEffectStack',
      label: 'Stack',
      align: 'right'
    }
  ], [effectPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={equipmentSetModelList} headCells={headers} />
    </Box>
  )
}