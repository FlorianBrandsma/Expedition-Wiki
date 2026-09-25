import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import type { WorldInteractableModel } from '../../../data/models/worldInteractableModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';

interface InteractableWorldSegmentProps {
  worldInteractableModelList: WorldInteractableModel[]
}

export default function InteractableWorldSegment({ worldInteractableModelList }: InteractableWorldSegmentProps) {

  const interactablePageModel = useInteractablePageContext();

  const headers = useMemo<HeadCell<WorldInteractableModel>[]>(() => [
    {
      label: 'Name', 
      align: 'left',
      render: (row) => {

        const name = {
          'Game':      'Game',
          'Terrain':   row.terrainName,
          'Quest':     row.questName,
          'Objective': row.objectiveName,
        }[row.parentTypeDescription];

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExIcon resourceName={row.iconResourceName} size={20} />
            <ExLink name={name} params={row.params} />
          </Box>
        )
      }
    }
  ], [interactablePageModel]);

  return (
    <BasicTable rowKey="id" rows={worldInteractableModelList} headCells={headers} />
  )
}