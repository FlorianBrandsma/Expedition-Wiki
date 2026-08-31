import { useMemo } from 'react';

import { useFactionPageContext } from '../factionPageContext';

import type { FactionModel } from '../../../data/models/factionModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function FactionStandingSegment() {

  const factionPageModel = useFactionPageContext();
  const { factionStandingModelList } = factionPageModel;

  const headers = useMemo<HeadCell<FactionModel>[]>(() => [
    { 
      label: 'Faction', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignFactions: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'faction'} name={row.name} />
        </Box>
      )
    },
    {
      id: 'factionRank',
      label: 'Rank',
      align: 'center'
    },
    {
      id: 'attitudeDescription',
      label: 'Attitude',
      align: 'left'
    }
  ], [factionPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey="id" rows={factionStandingModelList} headCells={headers} />
    </Box>
  )
}