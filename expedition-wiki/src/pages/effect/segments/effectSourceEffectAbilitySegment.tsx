import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { AbilityStatusEffectModel } from '../../../data/models/abilityStatusEffectModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceEffectAbilitySegment() {

  const effectPageModel = useEffectPageContext();
  const { abilityStatusEffectModelList } = effectPageModel;

  const headers = useMemo<HeadCell<AbilityStatusEffectModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.statusEffectIconResourceName} size={20} />
          <ExLink pageName={'effect'} name={row.statusEffectName} />
        </Box>
      )
    },
    {
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent(1)}
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={abilityStatusEffectModelList} headCells={headers} />
    </Box>
  )
}