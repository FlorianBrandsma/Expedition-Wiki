import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { EventModel } from '../../../data/models/eventModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';

export default function EffectEventSegment() {

  const effectPageModel = useEffectPageContext();
  const { eventModelList } = effectPageModel;

  const headers = useMemo<HeadCell<EventModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left'
    }
  ], [effectPageModel]);

  return (
    <Box sx={{ display: 'inline-block', minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={eventModelList} headCells={headers} />
    </Box>
  )
}