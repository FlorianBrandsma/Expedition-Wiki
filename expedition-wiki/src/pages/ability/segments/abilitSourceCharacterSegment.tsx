import { useMemo } from 'react';

import { useAbilityPageContext } from '../abilityPageContext';

import type { CharacterAgentInteractableModel } from '../../../data/models/characterAgentInteractableModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';
import { Box } from '@mui/material';

export default function AbilitySourceCharacterSegment() {

  const abilityPageModel = useAbilityPageContext();
  const { characterAgentInteractableModelList } = abilityPageModel;

  const headers = useMemo<HeadCell<CharacterAgentInteractableModel>[]>(() => [
    { 
      id: 'agentInteractableName', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.agentInteractableAssetIconResourceName} size={20} />
          <ExLink pageName={'interactable'} name={row.agentInteractableName} />
        </Box>
      )
    }
  ], [abilityPageModel]);

  return (
    <Box>
      <EnhancedTable rowKey="id" rows={characterAgentInteractableModelList} headCells={headers} />
    </Box>
  )
}