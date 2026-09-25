import { useMemo } from 'react';

import { useWorldInteractablePageContext } from '../worldInteractablePageContext';

import type { WorldInteractableModel } from '../../../data/models/worldInteractableModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';

export default function WorldInteractableObjectiveSegment() {

  const worldInteractablePageModel = useWorldInteractablePageContext();
  const { worldInteractableModelList } = worldInteractablePageModel;

  const headers = useMemo<HeadCell<WorldInteractableModel>[]>(() => [
    {
      label: 'Quest',
      align: 'left',
      render: (row) => (
        <ExLink name={row.questName} params={['quest', row.questName]} />
      )
    },
    {
      label: 'Objective', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExIcon resourceName={row.iconResourceName} size={20} />
          <ExLink name={row.objectiveName} params={row.params} />
        </Box>
      )
    }
  ], [worldInteractablePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey="id" rows={worldInteractableModelList} headCells={headers} />
    </Box>
  )
}