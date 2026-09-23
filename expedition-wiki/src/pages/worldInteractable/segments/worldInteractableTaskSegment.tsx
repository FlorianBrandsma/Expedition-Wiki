import { useMemo } from 'react';

import { useWorldInteractablePageContext } from '../worldInteractablePageContext';

import { WorldInteractableType, WorldInteractableParentType } from '../../../types/enums';

import type { TaskModel } from '../../../data/models/taskModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';

export default function WorldInteractableTaskSegment() {

  const worldInteractablePageModel = useWorldInteractablePageContext();
  const { taskModelList } = worldInteractablePageModel;

  const headers = useMemo<HeadCell<TaskModel>[]>(() => {

    const headers: HeadCell<TaskModel>[] = [
      { 
        label: 'Name', 
        align: 'left',
        render: (row) => {
        
          const originType = row.objectiveName ? 'objective' :
                             row.terrainName   ? 'terrain'   : '';

          const parentParams = originType === 'objective' ? [row.questName,  row.objectiveName] :
                               originType === 'terrain'   ? [row.regionName, row.terrainName  ] : [];

          return (
            <ExLink 
              name={row.name} 
              params={[
                originType,
                ...parentParams,
                'interactable',
                WorldInteractableType      [row.worldInteractableType]      .toLowerCase(),
                WorldInteractableParentType[row.worldInteractableParentType].toLowerCase(),
                row.worldInteractableName,
                'task',
                row.name
              ]}
            />
          )
        }
      }
    ]

    if (taskModelList.some(taskModel => taskModel.completeObjective)) {
      headers.unshift({
        label: 'Progress',
        align: 'center',
        sx: { padding: 0 },
        render: (row) => (
          row.completeObjective && (
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

  }, [worldInteractablePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={taskModelList} headCells={headers} />
    </Box>
  )
}