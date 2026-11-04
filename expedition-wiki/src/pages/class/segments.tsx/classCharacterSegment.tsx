import { useMemo } from 'react';

import { useClassPageContext } from '../classPageContext';

import type { CharacterAgentInteractableModel } from '../../../data/models/characterAgentInteractableModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function ClassCharacterSegment() {

  const classPageModel = useClassPageContext();
  const { characterAgentInteractableModelList } = classPageModel;

  const headers = useMemo<HeadCell<CharacterAgentInteractableModel>[]>(() => [
    {
      label: 'Name',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.agentInteractableAssetIconResourceName} size={20} />
          <ExLink name={row.agentInteractableName} params={['interactable', row.agentInteractableName]} />
        </Box>
      )
    }
  ], [classPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rows={characterAgentInteractableModelList} headCells={headers} />
    </Box>
  )
}