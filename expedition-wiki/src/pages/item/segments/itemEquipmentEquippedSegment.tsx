import { useMemo } from 'react';

import { useItemPageContext } from '../itemPageContext';

import type { CharacterAgentInteractableModel } from '../../../data/models/characterAgentInteractableModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function ItemEquipmentEquippedSegment() {

  const itemPageModel = useItemPageContext();
  const { characterAgentInteractableModelList } = itemPageModel;

  const headers = useMemo<HeadCell<CharacterAgentInteractableModel>[]>(() => [
    { 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.agentInteractableAssetIconResourceName} size={20} />
          <ExLink pageName={'interactable'} name={row.agentInteractableName} />
        </Box>
      )
    },
    {
      id: 'equipmentSlotTypeDescription',
      label: 'Slot',
      align: 'left'
    }
  ], [itemPageModel]);

  return (
    <Box>
      <BasicTable rowKey="id" rows={characterAgentInteractableModelList} headCells={headers} />
    </Box>
  )
}