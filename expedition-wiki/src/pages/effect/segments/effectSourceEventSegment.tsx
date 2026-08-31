import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { EffectEventModel } from '../../../data/models/effectEventModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
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
      align: 'center'
    }
  ], [effectPageModel]);

  return (
    <Box>
      <BasicTable rowKey='id' rows={effectEventModelList} headCells={headers} />
    </Box>
  )
}