import { useMemo } from 'react';

import { useFactionPageContext } from '../factionPageContext';

import type { FactionModel } from '../../../data/models/factionModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
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
      id: 'name', 
      label: 'Faction', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignFactions: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink pageName={'faction'} name={row.name} />
        </Box>
      )
    }
  ], [factionPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey="id" rows={factionModelList} headCells={headers} />
    </Box>
  )
}