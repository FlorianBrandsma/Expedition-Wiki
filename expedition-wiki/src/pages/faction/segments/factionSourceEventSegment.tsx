import { useMemo } from 'react';

import { useFactionPageContext } from '../factionPageContext';

import type { ReputationEventModel } from '../../../data/models/reputationEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box } from '@mui/material';

export default function FactionSourceEventSegment() {

  const factionPageModel = useFactionPageContext();
  const { reputationEventModelList } = factionPageModel;

  const headers = useMemo<HeadCell<ReputationEventModel>[]>(() => [
    { 
      id: 'eventName', 
      label: 'Name', 
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
      <BasicTable rowKey='id' rows={reputationEventModelList} headCells={headers} />
    </Box>
  )
}