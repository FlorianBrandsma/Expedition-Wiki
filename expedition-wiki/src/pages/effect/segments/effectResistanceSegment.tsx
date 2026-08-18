import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { ResistStatusEffectModel } from '../../../data/models/resistStatusEffectModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectResistanceSegment() {

  const effectPageModel = useEffectPageContext();
  const { effectModel, resistStatusEffectModelList } = effectPageModel;
  
  const headers = useMemo<HeadCell<ResistStatusEffectModel>[]>(() => [
    { 
      id: 'statusEffectName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignEffects: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.statusEffectIconResourceName} size={20} />
          <ExLink pageName={'effect'} name={row.statusEffectName} />
        </Box>
      )
    },
    {
      id: 'descriptionComponent',
      label: 'Description',
      align: 'left',
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent(effectModel.stack)}
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={resistStatusEffectModelList} headCells={headers} />
    </Box>
  )
}