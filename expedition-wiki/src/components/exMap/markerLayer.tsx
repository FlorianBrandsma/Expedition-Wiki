import { useEffect, useMemo, useState } from 'react';

import { Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import type { MapCoordinates } from '../../services/interfaces';

import type { TerrainModel } from '../../data/models/terrainModel';

import WaypointMarker from './waypointMarker';
import PinMarker from './pinMarker';

const ImageResolution = 128;

interface MarkerLayerProps {
  tileImageSize: number;
  terrainModel: TerrainModel;
  maxZoom: number;
  pins?: MapCoordinates[];
}

export default function MarkerLayer({ tileImageSize, terrainModel, maxZoom, pins }: MarkerLayerProps) {

  const { 
    tileSize,
    worldObjectReflectionModelList, 
    waypointModelList 
  } = terrainModel;

  const [zoom, setZoom] = useState(0);

  const map = useMap();

  useMapEvents({
    zoomend(e) {
      setZoom(e.target.getZoom())
    }
  });

  const worldScale = tileImageSize / tileSize;

  useEffect(() => {

    if (!pins || pins.length === 0) return;

    const coordinates = pins.map(pin => L.latLng(pin.z * worldScale, 
                                                 pin.x * worldScale));
    const bounds = L.latLngBounds(coordinates);

    map.fitBounds(bounds, {
      padding:[20,20],
      maxZoom: pins.length === 1 ? map.getZoom() : maxZoom 
    });
  }, [pins]);

  const objectMarkers = useMemo(() => {

    const cache = {} as Record<string, L.Icon>;

    return worldObjectReflectionModelList.map((worldObjectReflectionModel, index) => {

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

      const position = L.latLng(worldObjectReflectionModel.positionZ * worldScale, 
                                worldObjectReflectionModel.positionX * worldScale);

      return (
        <Marker
          key={index}
          position={position}
          icon={cache[cacheKey]}
          interactive={false}
        />
      )
    });

  }, [worldObjectReflectionModelList, zoom])

  const waypointMarkers = useMemo(() => {

    return waypointModelList.map((waypointModel, index) => {

      const position = L.latLng(waypointModel.positionZ * worldScale, 
                                waypointModel.positionX * worldScale);

      if (zoom < -1 && waypointModel.typeDescription == 'Minor') 
        return null;

      return (
        <WaypointMarker
          key={index}
          waypointModel={waypointModel} 
          position={position} 
          zoom={zoom} 
        />
      )
    });
    
  }, [waypointModelList, zoom])

  const pinMarkers = useMemo(() => {

    return pins?.map((mapPin, index) => {

      const position = L.latLng(mapPin.z * worldScale,
                                mapPin.x * worldScale);

      return (
        <PinMarker
          key={index}
          position={position}
        />
      )
    })

  }, [pins])

  return (
    <>
      {objectMarkers}
      {waypointMarkers}
      {pinMarkers}
    </>
  )
}