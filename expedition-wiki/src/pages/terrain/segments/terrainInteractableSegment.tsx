import { useMemo } from 'react';

import { useTerrainPageContext } from '../terrainPageContext';

import type { WorldInteractableModel } from '../../../data/models/worldInteractableModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import { Box } from '@mui/material';
import ExIcon from '../../../components/exIcon/exIcon';

export default function TerrainInteractableSegment() {

  const terrainPageModel = useTerrainPageContext();
  const { terrainModel, worldInteractableModelList } = terrainPageModel;

  const headers = useMemo<HeadCell<WorldInteractableModel>[]>(() => {
    
    const headers: HeadCell<WorldInteractableModel>[] = [
      {
        label: 'Name', 
        align: 'left',
        render: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {row.iconResourceName && (
              <ExIcon resourceName={row.iconResourceName} size={20} />
            )}
            <ExLink 
              name={row.name} 
              params={[
                'terrain',
                terrainModel.regionName, 
                terrainModel.name, 
                'interactable', 
                row.typeDescription.toLowerCase(), 
                row.parentTypeDescription.toLowerCase(), 
                row.name
              ]} 
            />
          </Box>
        )
      },
      {
        id: 'typeDescription',
        label: 'Type',
        align: 'left'
      },
      {
        label: 'Reflections', 
        align: 'center',
        render: (row) => row.worldInteractableReflectionModelList.length
      }
    ]

    return headers;

  }, [terrainPageModel]);

  return (
    <Box sx={{ mt: 1 }}>
      <BasicTable rowKey="id" rows={worldInteractableModelList} headCells={headers} />
    </Box>
  )
}