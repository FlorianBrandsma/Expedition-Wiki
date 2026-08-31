import { useMemo } from 'react';

import { useFactionPageContext } from '../factionPageContext';

import type { StandingStatusEffectModel } from '../../../data/models/standingStatusEffectModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function FactionSourceEffectSegment() {

  const factionPageModel = useFactionPageContext();
  const { standingStatusEffectModelList } = factionPageModel;

  const headers = useMemo<HeadCell<StandingStatusEffectModel>[]>(() => [
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
  ], [factionPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={standingStatusEffectModelList} headCells={headers} />
    </Box>
  )
}