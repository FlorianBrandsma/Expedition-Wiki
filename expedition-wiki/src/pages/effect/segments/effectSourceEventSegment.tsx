import { useMemo } from 'react';

import { useEffectPageContext } from '../effectPageContext';

import type { EffectEventModel } from '../../../data/models/effectEventModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function EffectSourceEventSegment() {

  const effectPageModel = useEffectPageContext();
  const { effectEventModelList } = effectPageModel;

  const headers = useMemo<HeadCell<EffectEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
      )
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