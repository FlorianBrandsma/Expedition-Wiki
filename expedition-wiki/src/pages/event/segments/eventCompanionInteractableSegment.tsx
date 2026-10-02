import { useMemo } from 'react';

import { useEventPageContext } from '../eventPageContext';

import type { PlayableCharacterAgentInteractableModel } from '../../../data/models/playableCharacterAgentInteractableModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';

export default function EventCompanionInteractableSegment() {

  const eventPageModel = useEventPageContext();
  const { playableCharacterAgentInteractableModelList } = eventPageModel;

  const headers = useMemo<HeadCell<PlayableCharacterAgentInteractableModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignEvents: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink name={row.interactableName} params={['interactable', row.interactableName]} />
        </Box>
      )
    }
  ], [eventPageModel]);

  return (
    <BasicTable rowKey="id" rows={playableCharacterAgentInteractableModelList} headCells={headers} />
  )
}