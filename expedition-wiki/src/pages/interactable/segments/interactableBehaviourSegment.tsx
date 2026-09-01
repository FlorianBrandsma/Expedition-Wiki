import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import type { AgentInteractableBehaviourModel } from '../../../data/models/agentInteractableBehaviourModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import { Box } from '@mui/material';

export default function InteractableBehaviourSegment() {

  const interactablePageModel = useInteractablePageContext();
  const { agentInteractableBehaviourModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<AgentInteractableBehaviourModel>[]>(() => [
    {
      id: 'targetDescription',
      label: 'Target',
      align: 'left'
    },
    { 
      label: 'Condition',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => row.conditionDescriptionComponent
    },
    {
      label: 'Command',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => row.commandDescriptionComponent
    }
  ], [interactablePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={agentInteractableBehaviourModelList} headCells={headers} />
    </Box>
  )
}