import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { ResistStatusEffectModel } from '../../../data/models/resistStatusEffectModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectResistanceSegment() {

  const effectPageModel = useEffectPageContext();
  const { effectModel, resistStatusEffectModelList } = effectPageModel;
  
  const headers = useMemo<HeadCell<ResistStatusEffectModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.statusEffectIconResourceName} size={20} />
          <ExLink name={row.statusEffectName} params={['effect', row.statusEffectName]} />
        </Box>
      )
    },
    {
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth: '200px' }}>
          {row.descriptionComponent(effectModel.stack)}
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={resistStatusEffectModelList} headCells={headers} />
    </Box>
  )
}