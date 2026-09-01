import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import type { DischargeAbilityModel } from '../../../data/models/dischargeAbilityModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExIcon from '../../../components/exIcon/exIcon';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function InteractableAbilitySegment() {

  const interactablePageModel = useInteractablePageContext();
  const { dischargeAbilityModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<DischargeAbilityModel>[]>(() => [
    { 
      label: 'Name',
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignInteractables: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.abilityIconResourceName} size={20} />
          <ExLink pageName={'ability'} name={row.abilityName} />
        </Box>
      )
    },
    {
      label: 'Description',
      align: 'left',
      sx: { whiteSpace: 'normal' },
      render: (row) => (
        <Box sx={{ maxWidth:'200px' }}>
          {row.abilityDescription}
        </Box>
      )
    }
  ], [interactablePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={dischargeAbilityModelList} headCells={headers} />
    </Box>
  )
}