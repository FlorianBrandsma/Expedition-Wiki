import { useMemo, useState } from 'react';

import { Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import type { TerrainModel } from '../../data/models/terrainModel';

import WaypointMarker from './waypointMarker';

const ImageResolution = 128;

interface MarkerLayerProps {
  tileImageSize: number;
  terrainModel: TerrainModel;
}

export default function MarkerLayer({ tileImageSize, terrainModel }: MarkerLayerProps) {

  const { 
    tileSize,
    worldObjectReflectionModelList, 
    waypointModelList 
  } = terrainModel;

  const [zoom, setZoom] = useState(0);

  useMapEvents({
    zoomend(e) {
      setZoom(e.target.getZoom())
    }
  });

  const worldScale = tileImageSize / tileSize;

  const objectMarkers = useMemo(() => {

    const cache = {} as Record<string, L.Icon>;

    return worldObjectReflectionModelList.map((worldObjectReflectionModel) => {

      const assetSize = Math.max(worldObjectReflectionModel.worldObjectAssetSizeX,
                                 worldObjectReflectionModel.worldObjectAssetSizeY, 
                                 worldObjectReflectionModel.worldObjectAssetSizeZ) * worldObjectReflectionModel.scale;

      const scaledSize = assetSize * worldScale * Math.pow(2, zoom);

      const iconResourceName = worldObjectReflectionModel.worldObjectIconResourceName;
      const cacheKey         = `${iconResourceName}_${scaledSize}`;

      if (!cache[cacheKey]) {
        cache[cacheKey] = L.icon({
          iconUrl: `/images/icons/objects/${iconResourceName}/${iconResourceName}_${ImageResolution}.webp`,
          iconSize: [scaledSize, scaledSize],
          iconAnchor: [scaledSize / 2, scaledSize / 2]
        })
      }

      const position = [worldObjectReflectionModel.positionZ * worldScale, 
                        worldObjectReflectionModel.positionX * worldScale] as L.LatLngExpression;

      return (
        <Marker
          key={worldObjectReflectionModel.id}
          position={position}
          icon={cache[cacheKey]}
          interactive={false}
        />
      )
    });

  }, [worldObjectReflectionModelList, zoom])

  const waypointMarkers = useMemo(() => {

    return waypointModelList.map((waypointModel) => {

      const position = [waypointModel.positionZ * worldScale, 
                        waypointModel.positionX * worldScale] as L.LatLngExpression;

      if (zoom < -1 && waypointModel.typeDescription == 'Minor') 
        return null;

      return (
        <WaypointMarker
          key={waypointModel.id}
          waypointModel={waypointModel} 
          position={position} 
          zoom={zoom} 
        />
      )
    });
    
  }, [waypointModelList, zoom])

  return (
    <>
      {objectMarkers}
      {waypointMarkers}
    </>
  )
}