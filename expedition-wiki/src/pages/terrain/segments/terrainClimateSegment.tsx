import { useMemo } from 'react';

import { useTerrainPageContext } from '../terrainPageContext';

import type { ClimateModel } from '../../../data/models/climateModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';
import CellTable from '../../../components/cellTable/cellTable';
import ExIcon from '../../../components/exIcon/exIcon';

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
            <ExLink pageName={'climate'} name={row.name} params={[terrainModel.regionName, terrainModel.name, row.name]}/>
          </Box>
        )
      }
    ]

    if (climateModelList.some(model => model.chunkModelList?.length > 0)) {
      
        headers.push({
          label: 'Chunks',
          align: 'left',
          sx: { whiteSpace: 'normal' },
          render: (row) => (
            <Box sx={{ maxWidth:'200px'}}>
              <CellTable 
                list={row.chunkModelList} 
                component={(chunkModel) => chunkModel.name}
                bulleted
              />
            </Box>
          )
        })
      }

    return headers;

  }, [terrainPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey='id' rows={climateModelList} headCells={headers} />
    </Box>
  )
}