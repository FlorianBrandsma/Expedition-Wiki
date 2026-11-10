import { useMemo } from 'react';

import { useTaskPageContext } from '../taskPageContext';

import type { InteractionModel } from '../../../data/models/interactionModel';

import BasicTable, { type HeadCell } from '../../../components/basicTable/basicTable';
import ExLink from '../../../components/exLink/exLink';
import ExMap from '../../../components/exMap/exMap';

export default function TaskInteractableLocationSegment() {

  const taskPageModel = useTaskPageContext();

  const { 
    interactionModelList, 
    terrainModelList 
  } = taskPageModel;

  const headers = useMemo<HeadCell<InteractionModel>[]>(() => {

    const headers: HeadCell<InteractionModel>[] = [
      {
        id: 'timeDescription',
        label: 'Time',
        align: 'center'
      },
      { 
        label: 'Terrain', 
        align: 'left',
        render: (row) => (
          <ExLink name={row.terrainName} params={['terrain', row.regionName, row.terrainName]} />
        )
      },
      {
        label: 'Spawns', 
        align: 'center',
        render: (row) => (
          Math.max(row.entityWorldInteractableReflectionMovementModelList.length, row.triggerWorldInteractableReflectionModelList.length)
        )
      },
      {
        label: 'Map',
        align: 'center',
        render: (row) => {

          const terrainModel = terrainModelList.find(terrainModel => terrainModel.name       === row.terrainName && 
                                                                     terrainModel.regionName === row.regionName);

          if (!terrainModel) return;

          const { pinGroups } = row;

          const coordinates = pinGroups.flatMap(x => x.mapCoordinates);

          return (
            <ExMap 
              terrainModel={terrainModel}
              {...(coordinates.length > 0 ? {
                position: {
                  x: coordinates.reduce((sum, pin) => sum + pin.x, 0) / coordinates.length, 
                  z: coordinates.reduce((sum, pin) => sum + pin.z, 0) / coordinates.length
                }
              } : {})}
              focusMapCoordinates={coordinates}
              pinGroups={pinGroups}
              sx={{
                height: 200,
                width: 200
              }} 
            />
          )
        }
      }
    ];

    return headers;

  }, [taskPageModel]);

  return (
    <BasicTable rows={interactionModelList} headCells={headers} />
  )
}