import { useMemo } from 'react';

import { useObjectivePageContext } from '../objectivePageContext';

import type { WorldInteractableModel } from '../../../data/models/worldInteractableModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';

export default function ObjectiveInteractableSegment() {

  const objectivePageModel = useObjectivePageContext();
  const { objectiveModel, worldInteractableModelList } = objectivePageModel;

  const headers = useMemo<HeadCell<WorldInteractableModel>[]>(() => [
    {
      label: 'Progress',
      align: 'left',
      render: (row) => (
        <></>
      )
    },
    {
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {row.iconResourceName && (
            <ExIcon resourceName={row.iconResourceName} size={20} />
          )}
          <ExLink pageName={`interactable/${ row.parentTypeDescription }`} name={row.name} params={[objectiveModel.questName, objectiveModel.name, row.name]} />
        </Box>
      )
    },
    {
      id: 'typeDescription',
      label: 'Type', 
      align: 'left'
    }
  ], [objectivePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey="id" rows={worldInteractableModelList} headCells={headers} />
    </Box>
  )
}