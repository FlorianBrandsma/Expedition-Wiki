import { useMemo } from 'react';

import { useTerrainPageContext } from '../terrainPageContext';

import type { TransportEventModel } from '../../../data/models/transportEventModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';

export default function TerrainTransportSegment() {

  const terrainPageModel = useTerrainPageContext();
  const { transportEventModelList } = terrainPageModel;

  const headers = useMemo<HeadCell<TransportEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
      )
    }
  ], [terrainPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={transportEventModelList} headCells={headers} />
    </Box>
  )
}