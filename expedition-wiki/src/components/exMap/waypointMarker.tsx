import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { Typography } from '@mui/material';

const icon = L.icon({
  iconUrl: '/images/icons/objects/Nothing/Nothing.webp'
});

import type { WaypointModel } from "../../data/models/waypointModel";
import { WaypointType } from '../../types/enums';

interface WaypointMarkerProps {
  waypointModel: WaypointModel;
  position: L.LatLngExpression;
  zoom: number;
}

export default function WaypointMarker({ waypointModel, position, zoom }: WaypointMarkerProps) {

  let baseFontSize = 0;

  switch (WaypointType[waypointModel.type])
  {
    case 'Minor': baseFontSize = 1;    break;
    case 'Major': baseFontSize = 1.25; break;
  }

  return (
    <Marker
      icon={icon}
      position={position}
      interactive={false}
    >
      <Tooltip
        permanent
        direction='center'
        className="mui-tooltip-marker"
      >
        <Typography
          variant='caption'
          sx={(theme) => ({
            color: theme.palette.primary.contrastText,
            letterSpacing: waypointModel.typeDescription === 'Major' ? '0.25em' : 'inherit',
            fontSize: zoom >= 0 ? `${baseFontSize}rem` : `${Math.max(baseFontSize + (0.25 * zoom), 0.1)}rem`,
            fontStyle: waypointModel.typeDescription === 'Major' ? 'italic' : 'normal',
            WebkitTextStroke: `3px ${theme.palette.primary.dark}`,
            paintOrder: 'stroke fill'
          })}
        >
          {waypointModel.name}
        </Typography>
      </Tooltip>
    </Marker>
  )
}