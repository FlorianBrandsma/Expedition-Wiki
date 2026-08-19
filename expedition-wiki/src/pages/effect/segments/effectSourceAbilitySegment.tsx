import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { AbilityModel } from '../../../data/models/abilityModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceAbilitySegment() {

  const effectPageModel = useEffectPageContext();
  const { abilityModelList } = effectPageModel;

  const headers = useMemo<HeadCell<AbilityModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignEffects: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'ability'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'description',
      label: 'Description',
      align: 'left'
    },
    {
      id: 'effectStack',
      label: 'Stack',
      align: 'center'
    }
  ], [effectPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={abilityModelList} headCells={headers} />
    </Box>
  )
}