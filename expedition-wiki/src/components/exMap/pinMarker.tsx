import { Marker } from 'react-leaflet';
import L from 'leaflet';

const ICON_PATH = '/images/icons/general/selection/Selection_Minimal_Red/Selection_Minimal_Red_128.webp';
const ICON_SIZE = 24;
const MINOR_ICON_SCALE = 1.5;

const MAJOR_ICON = L.icon({
  iconUrl: ICON_PATH,
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [ICON_SIZE / 2, ICON_SIZE]
});

const MINOR_ICON = L.icon({
  iconUrl: ICON_PATH,
  iconSize:   [ICON_SIZE / MINOR_ICON_SCALE,     ICON_SIZE / MINOR_ICON_SCALE],
  iconAnchor: [ICON_SIZE / MINOR_ICON_SCALE / 2, ICON_SIZE / MINOR_ICON_SCALE]
});

interface PinMarkerProps {
  position: L.LatLngExpression;
  mainPin: boolean;
}

export default function PinMarker({ position, mainPin }: PinMarkerProps) {
  return (
    <Marker
      icon={mainPin ? MAJOR_ICON : MINOR_ICON}
      position={position}
      interactive={false}
    />
  )
}