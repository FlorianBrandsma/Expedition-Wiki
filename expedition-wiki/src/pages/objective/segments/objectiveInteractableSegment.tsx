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

  const headers = useMemo<HeadCell<WorldInteractableModel>[]>(() => {
    
    const headers: HeadCell<WorldInteractableModel>[] = [
      {
        label: 'Name', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {row.iconResourceName && (
              <ExIcon resourceName={row.iconResourceName} size={20} />
            )}
            <ExLink 
              name={row.name} 
              params={[
                'objective',
                objectiveModel.questName, 
                objectiveModel.name, 
                'interactable', 
                row.typeDescription      .toLowerCase(), 
                row.parentTypeDescription.toLowerCase(), 
                row.name
              ]} 
            />
          </Box>
        )
      },
      {
        id: 'typeDescription',
        label: 'Type',
        align: 'left'
      },
      {
        label: 'Origin', 
        align: 'left',
        render: (row) => {
          switch (row.parentTypeDescription)
          {
            case 'Terrain':   return <ExLink name={row.parentTypeDescription} params={[row.parentTypeDescription.toLowerCase(), row.regionName, row.terrainName]} />
            case 'Quest':     return <ExLink name={row.parentTypeDescription} params={[row.parentTypeDescription.toLowerCase(), objectiveModel.questName]} />
            case 'Objective': return row.parentTypeDescription
          }
        }
      }
    ]

    if (worldInteractableModelList.some(worldInteractableModel => worldInteractableModel.taskModelList.some(taskModel => taskModel.completeObjective))) {
      headers.unshift({
        label: 'Progress',
        align: 'center',
        sx: { padding: 0 },
        render: (row) => (
          row.taskModelList.some(x => x.completeObjective) && (
            <Box
              component="img"
              src={'/images/icons/general/Progress_Icon.png'}
              sx={{ 
                height: '2rem',
                verticalAlign: 'middle' 
              }}
            />
          )
        )
      })
    }

    return headers;

  }, [objectivePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey="id" rows={worldInteractableModelList} headCells={headers} />
    </Box>
  )
}