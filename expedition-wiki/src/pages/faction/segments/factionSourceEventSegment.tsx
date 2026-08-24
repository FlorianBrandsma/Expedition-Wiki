import { useMemo } from 'react';

import { useFactionPageContext } from '../factionPageContext';

import type { ReputationEventModel } from '../../../data/models/reputationEventModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';

export default function FactionSourceEventSegment() {

  const factionPageModel = useFactionPageContext();
  const { reputationEventModelList } = factionPageModel;

  const headers = useMemo<HeadCell<ReputationEventModel>[]>(() => [
    { 
      id: 'eventName', 
      label: 'Event', 
      align: 'left'
    },
    {
      id: 'factionReputation',
      label: 'Reputation',
      align: 'center'
    }
  ], [factionPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey='id' rows={reputationEventModelList} headCells={headers} />
    </Box>
  )
}