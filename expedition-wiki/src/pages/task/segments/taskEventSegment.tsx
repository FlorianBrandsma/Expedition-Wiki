import { useMemo } from 'react';

import { useTaskPageContext } from '../taskPageContext';

import type { EventModel } from '../../../data/models/eventModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function TaskEventSegment() {

  const taskPageModel = useTaskPageContext();
  const { eventModelList } = taskPageModel;

  const headers = useMemo<HeadCell<EventModel>[]>(() => {

    const headers: HeadCell<EventModel>[] = [
      {
        id: 'interactionTimeDescription',
        label: 'Time',
        align: 'center'
      },
      {
        label: 'Event',
        align: 'left',
        render: (row) => (
          <ExLink name={row.name} params={row.params} />
        )
      },
      {
        id: 'typeDescription',
        label: 'Type',
        align: 'left'
      }
    ];

    if (eventModelList.some(eventModel => eventModel.completeTask)) {
      headers.unshift({
        label: 'Completion',
        align: 'center',
        sx: { padding: 0 },
        render: (row) => (
          row.completeTask && (
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

  }, [taskPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={eventModelList} headCells={headers} />
    </Box>
  )
}