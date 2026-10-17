import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/dist/Control.FullScreen.css';
import 'leaflet.fullscreen';

import type { MapCoordinates, PinGroup } from '../../services/interfaces';

import type { TerrainModel } from '../../data/models/terrainModel';

import { useTheme, type SxProps } from '@mui/material/styles';
import { Box, type Theme } from "@mui/material";
import MarkerLayer from './markerLayer';
import PseudoFullscreenEscapeHandler from './pseudoFullscreenEscapeHandler';

const topLeftCRS = L.Util.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(1, 0, 1, 0)
});

interface ExMapProps {
  terrainModel: TerrainModel;
  position?: MapCoordinates;
  pinGroups?: PinGroup[]
  sx?: SxProps<Theme>;
}

export default function ExMap({ terrainModel, sx, position, pinGroups }: ExMapProps) {
  
  const { 
    tileSetResourceName,
    tileSize,
    mapGrid
  } = terrainModel;

  const theme = useTheme();

  const minZoom = -4;
  const maxZoom =  2;
  
  const gridHeight = mapGrid   ?.length || 0;
  const gridWidth  = mapGrid[0]?.length || 0;
  
  const tileImageSize = 256;

  const bounds = L.latLngBounds([0, 0], [gridHeight * tileImageSize, gridWidth * tileImageSize]);

  const worldScale = tileImageSize / tileSize;

  const center = position ? L.latLng(position.z * worldScale, 
                                     position.x * worldScale) :
                            L.latLng((gridHeight * tileImageSize) / 2, 
                                     (gridWidth  * tileImageSize) / 2);

  return (
    <Box 
      sx={{
        ...sx,
        '& .leaflet-control-zoom, & .leaflet-control-fullscreen': {
          opacity: 0.75
        }
      }}
    >
      <MapContainer
        preferCanvas={true}
        crs={topLeftCRS}
        center={center}
        maxBounds={bounds}
        zoom={0}
        minZoom={minZoom}
        maxZoom={maxZoom}
        attributionControl={false}
        style={{ 
          height: '100%', 
          width: '100%',
          backgroundColor: theme.palette.primary.light
        }}
        fullscreenControl={true}
        fullscreenControlOptions={{
          position: 'topright',
          forceSeparateButton: true,
          forcePseudoFullscreen: true
        }}
      >
        <TileLayer 
          url=''
          noWrap
          tileSize={tileImageSize}
          bounds={bounds}
          minNativeZoom={0}
          maxNativeZoom={0}
          minZoom={minZoom}
          maxZoom={maxZoom}
          ref={(layer) => {
            if (layer) {
              layer.getTileUrl = (coords) => `/images/tiles/${tileSetResourceName}/${mapGrid[coords.y][coords.x]}.webp`;
            }
          }}
        />

        <MarkerLayer 
          tileImageSize={tileImageSize}
          terrainModel={terrainModel}
          maxZoom={maxZoom}
          pinGroups={pinGroups}
        />

        <PseudoFullscreenEscapeHandler />
      </MapContainer>
    </Box>
  )
}