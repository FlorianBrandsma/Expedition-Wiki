import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { AgentInteractableModel } from '../../../data/models/agentInteractableModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function EffectSourceAgentDefaultSegment() {

  const effectPageModel = useEffectPageContext();
  const { agentInteractableModelList } = effectPageModel;

  const headers = useMemo<HeadCell<AgentInteractableModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.interactableAssetIconResourceName} size={20} />
          <ExLink name={row.interactableName} params={['interactable', row.interactableName]} />
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
      <BasicTable rowKey='id' rows={agentInteractableModelList} headCells={headers} />
    </Box>
  )
}