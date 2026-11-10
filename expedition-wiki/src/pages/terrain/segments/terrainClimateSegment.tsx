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
            
            const coordinates = row.chunkModelList.flatMap(x => x.centerCoordinates);

            return (
              <ExMap 
                terrainModel={terrainModel}
                chunkModelList={row.chunkModelList}
                {...(coordinates.length > 0 ? {
                  position: {
                    x: coordinates.reduce((sum, pin) => sum + pin.x, 0) / coordinates.length, 
                    z: coordinates.reduce((sum, pin) => sum + pin.z, 0) / coordinates.length
                  }
                } : {})}
                focusMapCoordinates={coordinates}
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