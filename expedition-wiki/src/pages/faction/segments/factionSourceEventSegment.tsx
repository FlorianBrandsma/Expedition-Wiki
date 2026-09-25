import { useMemo } from 'react';

import { useFactionPageContext } from '../factionPageContext';

import type { ReputationEventModel } from '../../../data/models/reputationEventModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function FactionSourceEventSegment() {

  const factionPageModel = useFactionPageContext();
  const { reputationEventModelList } = factionPageModel;

  const headers = useMemo<HeadCell<ReputationEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
      )
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