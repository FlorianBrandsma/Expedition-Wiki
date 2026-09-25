import { useMemo } from 'react';

import { useWorldInteractablePageContext } from '../worldInteractablePageContext';

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
        render: row => (
          <ExLink name={row.name} params={row.params} />
        )
      }
    ]

    if (taskModelList.some(taskModel => taskModel.completeObjective)) {
      headers.unshift({
        label: 'Completion',
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