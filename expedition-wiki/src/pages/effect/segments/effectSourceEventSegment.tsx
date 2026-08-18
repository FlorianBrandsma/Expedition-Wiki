import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { EffectEventModel } from '../../../data/models/effectEventModel';

import EnhancedTable, { type HeadCell } from '../../../components/enhancedTable/enhancedTable';
import { Box } from '@mui/material';

export default function EffectSourceEventSegment() {

  const effectPageModel = useEffectPageContext();
  const { effectEventModelList } = effectPageModel;

  const headers = useMemo<HeadCell<EffectEventModel>[]>(() => [
    { 
      id: 'eventName', 
      label: 'Name', 
      align: 'left'
    },
    {
      id: 'effectStack',
      label: 'Stack',
      align: 'right'
    }
  ], [effectPageModel]);

  return (
    <Box sx={{ minWidth: '200px' }}>
      <EnhancedTable rowKey='id' rows={effectEventModelList} headCells={headers} />
    </Box>
  )
}