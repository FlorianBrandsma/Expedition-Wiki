import { useMemo } from 'react';

import { useInteractablePageContext } from '../interactablePageContext';

import type { EventModel } from '../../../data/models/eventModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function InteractableEventSegment() {

  const interactablePageModel = useInteractablePageContext();
  const { eventModelList } = interactablePageModel;

  const headers = useMemo<HeadCell<EventModel>[]>(() => [
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
  ], [interactablePageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={eventModelList} headCells={headers} />
    </Box>
  )
}