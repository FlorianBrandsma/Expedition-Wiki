import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { AgentInteractableModel } from '../../../data/models/agentInteractableModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceAgentSegment() {

  const effectPageModel = useEffectPageContext();
  const { agentInteractableModelList } = effectPageModel;

  const headers = useMemo<HeadCell<AgentInteractableModel>[]>(() => [
    { 
      id: 'interactableName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.interactableAssetIconResourceName} size={20} />
          <ExLink pageName={'interactable'} name={row.interactableName} />
        </Box>
      )
    },
    {
      id: 'statusEffectStack',
      label: 'Stack',
      align: 'center'
    }
  ], [effectPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey='id' rows={agentInteractableModelList} headCells={headers} />
    </Box>
  )
}