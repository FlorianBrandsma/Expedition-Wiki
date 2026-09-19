import { useMemo } from 'react';

import { useWorldInteractablePageContext } from '../worldInteractablePageContext';

import type { WorldInteractableType, WorldInteractableParentType } from '../../../types/enums';

import type { TaskModel } from '../../../data/models/taskModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function WorldInteractableTaskSegment() {

  const params = useParams<{ 
    type: WorldInteractableType, 
    parentType: WorldInteractableParentType, 
    regionName: string;
    terrainName: string;
    questName: string, 
    objectiveName: string, 
    worldInteractableName: string 
  }>();

  const worldInteractablePageModel = useWorldInteractablePageContext();
  const { taskModelList } = worldInteractablePageModel;

  const headers = useMemo<HeadCell<TaskModel>[]>(() => {

    const parentParams = [ 
      params.regionName,
      params.terrainName,
      params.questName,
      params.objectiveName
    ].filter(Boolean) as string[];

    const headers: HeadCell<TaskModel>[] = [
      { 
        label: 'Name', 
        align: 'left',
        render: (row) => (
          <ExLink 
            pageName={'task'} 
            name={row.name} 
            params={[
              params.type!.toLowerCase(), 
              params.parentType!.toLowerCase(), 
              ...parentParams,
              params.worldInteractableName!, 
              row.name
            ]}
          />
        )
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