import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { AbsorbResourceEffectModel } from '../../../data/models/absorbResourceEffectModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceEffectAbsorbSegment() {

  const effectPageModel = useEffectPageContext();
  const { effectModel, absorbResourceEffectModelList } = effectPageModel;

  const headers = useMemo<HeadCell<AbsorbResourceEffectModel>[]>(() => [
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
          {row.descriptionComponent(effectModel.stack)}
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={absorbResourceEffectModelList} headCells={headers} />
    </Box>
  )
}