import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { EffectModel } from '../../../data/models/effectModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectRepeatSegment() {

  const effectPageModel = useEffectPageContext();
  const { effectModel } = effectPageModel;

  const effectModelList = effectModel.statusEffectModel.repeatStatusEffectModel.effectModelList;

  const headers = useMemo<HeadCell<EffectModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'effect'} name={row.name} />
        </Box>
      )
    },
    {
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px'}}>
          {row.descriptionComponent()}
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={effectModelList} headCells={headers} />
    </Box>
  )
}