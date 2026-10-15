import { Marker } from 'react-leaflet';
import L from 'leaflet';

const IconSize = 24;

const icon = L.icon({
  iconUrl: '/images/icons/general/selection/Selection_Minimal_Red/Selection_Minimal_Red_128.webp',
  iconSize: [IconSize, IconSize],
  iconAnchor: [IconSize / 2, IconSize]
});

interface PinMarkerProps {
  position: L.LatLngExpression;
}

export default function PinMarker({ position }: PinMarkerProps) {
  return (
    <Marker
      icon={icon}
      position={position}
      interactive={false}
    />
  )
}