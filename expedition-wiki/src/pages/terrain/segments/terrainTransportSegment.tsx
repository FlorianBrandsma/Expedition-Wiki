import { useMemo } from 'react';

import { useTerrainPageContext } from '../terrainPageContext';

import type { TransportEventModel } from '../../../data/models/transportEventModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import ExMap from '../../../components/exMap/exMap';

export default function TerrainTransportSegment() {

  const terrainPageModel = useTerrainPageContext();
  const { terrainModel, transportEventModelList } = terrainPageModel;

  const headers = useMemo<HeadCell<TransportEventModel>[]>(() => [
    { 
      label: 'Event', 
      align: 'left',
      render: (row) => (
        <ExLink name={row.eventModel.name} params={row.eventModel.params}/>
      )
    },
    {
      label: 'Map',
      align: 'center',
      render: (row) => (
        <ExMap 
          terrainModel={terrainModel}
          position={{
            x: row.positionX, 
            z: row.positionZ
          }}
          pins={[{
            x: row.positionX, 
            z: row.positionZ
          }]}
          sx={{
            height: 200,
            width: 200
          }} 
        />      
      )
    }
  ], [terrainPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rows={transportEventModelList} headCells={headers} />
    </Box>
  )
}