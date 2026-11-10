import { useMemo } from 'react';

import { useTerrainPageContext } from '../terrainPageContext';

import type { ClimateModel } from '../../../data/models/climateModel';

import { Box } from '@mui/material';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import ExIcon from '../../../components/exIcon/exIcon';
import ExMap from '../../../components/exMap/exMap';

export default function TerrainClimateSegment() {

  const terrainPageModel = useTerrainPageContext();
  const { terrainModel, climateModelList } = terrainPageModel;

  const headers = useMemo<HeadCell<ClimateModel>[]>(() => {

    const headers: HeadCell<ClimateModel>[] = [
      { 
        label: 'Name', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {row.iconResourceName && <ExIcon resourceName={row.iconResourceName} size={20} />}
            <ExLink name={row.name} params={['climate', terrainModel.regionName, terrainModel.name, row.name]}/>
          </Box>
        )
      }
    ]

    if (climateModelList.some(model => model.chunkModelList?.length > 0)) {

        headers.push({
          label: 'Chunks',
          align: 'center',
          sx: { whiteSpace: 'normal' },
          render: (row) => {
            
            const centerCoordinates = row.chunkModelList.flatMap(x => x.centerCoordinates);
            const boundsCoordinates = row.chunkModelList.flatMap(x => x.boundsCoordinates);

            return (
              <ExMap 
                terrainModel={terrainModel}
                chunkModelList={row.chunkModelList}
                {...(centerCoordinates.length > 0 ? {
                  position: {
                    x: centerCoordinates.reduce((sum, coordinates) => sum + coordinates.x, 0) / centerCoordinates.length, 
                    z: centerCoordinates.reduce((sum, coordinates) => sum + coordinates.z, 0) / centerCoordinates.length
                  }
                } : {})}
                focusMapCoordinates={boundsCoordinates}
                sx={{
                  height: 200,
                  width: 200
                }} 
              />
            )
          }
        })
      }

    return headers;

  }, [terrainPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rows={climateModelList} headCells={headers} />
    </Box>
  )
}