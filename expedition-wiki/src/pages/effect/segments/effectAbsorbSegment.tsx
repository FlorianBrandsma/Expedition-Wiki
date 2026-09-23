import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { DamageResourceEffectModel } from '../../../data/models/damageResourceEffectModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectAbsorbSegment() {

  const effectPageModel = useEffectPageContext();
  const { effectModel } = effectPageModel;

  const damageResourceEffectModelList = effectModel.resourceEffectModel.absorbResourceEffectModel.damageResourceEffectModelList;

  const headers = useMemo<HeadCell<DamageResourceEffectModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.resourceEffectIconResourceName} size={20} />
          <ExLink name={row.resourceEffectName} params={['effect', row.resourceEffectName]} />
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
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={damageResourceEffectModelList} headCells={headers} />
    </Box>
  )
}