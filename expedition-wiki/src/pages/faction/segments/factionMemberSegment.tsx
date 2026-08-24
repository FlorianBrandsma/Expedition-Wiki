import { useMemo } from 'react';

import { useFactionPageContext } from '../factionPageContext';

import type { InteractableModel } from '../../../data/models/interactableModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function FactionMemberSegment() {

  const factionPageModel = useFactionPageContext();
  const { interactableModelList } = factionPageModel;

  const headers = useMemo<HeadCell<InteractableModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Interactable', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignFactions: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.assetIconResourceName} size={20} />
          <ExLink pageName={'interactable'} name={row.name} />
        </Box>
      )
    }
  ], [factionPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <EnhancedTable rowKey="id" rows={interactableModelList} headCells={headers} />
    </Box>
  )
}