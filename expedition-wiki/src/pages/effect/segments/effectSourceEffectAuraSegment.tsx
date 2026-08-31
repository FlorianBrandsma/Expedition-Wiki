import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { AuraStatusEffectModel } from '../../../data/models/auraStatusEffectModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceEffectAuraSegment() {

  const effectPageModel = useEffectPageContext();
  const { effectModel, auraStatusEffectModelList } = effectPageModel;

  const headers = useMemo<HeadCell<AuraStatusEffectModel>[]>(() => [
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
          {row.descriptionComponent(effectModel.stack)}
        </Box>
      )
    }
  ], [effectPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={auraStatusEffectModelList} headCells={headers} />
    </Box>
  )
}