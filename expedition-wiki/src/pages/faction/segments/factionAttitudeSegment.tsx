import { useMemo } from 'react';

import { useFactionPageContext } from '../factionPageContext';

import type { FactionModel } from '../../../data/models/factionModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

interface FactionAttitudeSegmentProps {
  factionModelList: FactionModel[];
}

export default function FactionAttitudeSegment({ factionModelList }: FactionAttitudeSegmentProps) {

  const factionPageModel = useFactionPageContext();

  const headers = useMemo<HeadCell<FactionModel>[]>(() => [
    { 
      label: 'Faction', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignFactions: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink name={row.name} params={['faction', row.name]} />
        </Box>
      )
    }
  ], [factionPageModel]);

  return (
    <Box>
      <BasicTable rowKey="id" rows={factionModelList} headCells={headers} />
    </Box>
  )
}