import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { EventModel } from '../../../data/models/eventModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function EffectEventSegment() {

  const effectPageModel = useEffectPageContext();
  const { eventModelList } = effectPageModel;

  const headers = useMemo<HeadCell<EventModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.name} params={row.params}/>
      )
    }
  ], [effectPageModel]);

  return (
    <Box sx={{ mt: 1  }}>
      <BasicTable rowKey='id' rows={eventModelList} headCells={headers} />
    </Box>
  )
}