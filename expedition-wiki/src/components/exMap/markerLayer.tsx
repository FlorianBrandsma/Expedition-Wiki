import { Fragment, useEffect, useMemo, useState } from 'react';
import { Circle, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import type { PinGroup } from '../../services/interfaces';

import type { TerrainModel } from '../../data/models/terrainModel';

import WaypointMarker from './waypointMarker';
import PinMarker from './pinMarker';
import DecoratedPolyline from './decoratedPolyline';

interface MarkerLayerProps {
  tileImageSize: number;
  terrainModel: TerrainModel;
  maxZoom: number;
  pinGroups?: PinGroup[];
}

export default function MarkerLayer({ tileImageSize, terrainModel, maxZoom, pinGroups }: MarkerLayerProps) {

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

    if (!pinGroups || pinGroups.length === 0) return;

    const pinCoordinates = pinGroups.flatMap(pinGroup => pinGroup.mapCoordinates);

    if (pinCoordinates.length === 0) return;

    const coordinates = pinCoordinates.map(pin => 
      L.latLng(pin.z * worldScale, pin.x * worldScale)
    );

    const bounds = L.latLngBounds(coordinates);

    map.fitBounds(bounds, {
      padding:[20,20],
      maxZoom: pinCoordinates.length === 1 ? map.getZoom() : maxZoom 
    });

  }, [pinGroups]);

  const objectMarkers = useMemo(() => {

    const cache = {} as Record<string, L.Icon>;

    return worldObjectReflectionModelList.map((worldObjectReflectionModel, index) => {

      const imageResolution = 128;

      const assetSize = Math.max(worldObjectReflectionModel.worldObjectAssetSizeX,
                                 worldObjectReflectionModel.worldObjectAssetSizeY, 
                                 worldObjectReflectionModel.worldObjectAssetSizeZ) * worldObjectReflectionModel.scale;

      const scaledSize = assetSize * worldScale * Math.pow(2, zoom);

      const iconResourceName = worldObjectReflectionModel.worldObjectIconResourceName;
      const cacheKey         = `${iconResourceName}_${scaledSize}`;

      if (!cache[cacheKey]) {
        cache[cacheKey] = L.icon({
          iconUrl: `/images/icons/objects/${iconResourceName}/${iconResourceName}_${imageResolution}.webp`,
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

    if (!pinGroups) return null;

    const markerColor = '#cf4221';

    return pinGroups.map((pinGroup, groupIndex) => {

      const pinPositions = pinGroup.mapCoordinates.map(pin => 
        L.latLng(pin.z * worldScale, pin.x * worldScale)
      );

      const linePositions = pinGroup.arrivalType === 'Repeat' && pinPositions.length > 1 ?
        [...pinPositions, pinPositions[0]] : pinPositions;

      const polylineOptions = {
        color: markerColor,
        weight: 2,
        dashArray: '5, 5',
        interactive: false
      };

      return (
        <Fragment key={`group-${groupIndex}`}>
          {pinGroup.mapCoordinates.map((mapCoordinates, pinIndex) => {
            
            const position = pinPositions[pinIndex];

            return (
              <Fragment key={`pin-${groupIndex}-${pinIndex}`}>
                {!!mapCoordinates.variance && (
                  <Circle 
                    center={position}
                    radius={mapCoordinates.variance * worldScale}
                    color={markerColor}
                    weight={1}
                    interactive={false}
                  />
                )}
                <PinMarker 
                  position={position}
                  mainPin={pinIndex === 0}
                />
              </Fragment>
            )
          })}

          {pinPositions.length > 1 && (
            <>
              <DecoratedPolyline 
                positions={linePositions}
                pathOptions={polylineOptions}
              />
              {pinGroup.arrivalType === 'Backtrace' && (
                <DecoratedPolyline 
                  positions={linePositions}
                  pathOptions={polylineOptions}
                  reverse={true}
                />
              )}
            </>
          )}
        </Fragment>
      )
    });

  }, [pinGroups, worldScale])

  return (
    <>
      {objectMarkers}
      {waypointMarkers}
      {pinMarkers}
    </>
  )
}