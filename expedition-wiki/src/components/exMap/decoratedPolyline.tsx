import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-polylinedecorator';

interface DecoratedPolylineProps {
  positions: L.LatLng[];
  pathOptions: L.PathOptions;
  reverse?: boolean;
}

export default function DecoratedPolyline({ positions, pathOptions, reverse = false }: DecoratedPolylineProps) {
  const map = useMap();

  useEffect(() => {

    const polyline = L.polyline(
      reverse ? [...positions].reverse() : positions, 
      pathOptions
    )
    
    if(!reverse) {
      polyline.addTo(map);
    }

    const patterns: L.PolylinePattern[] = [{
      offset: 0,
      repeat: '50px',
      symbol: L.Symbol.arrowHead({
        pixelSize: 5,
        polygon: true,
        pathOptions: {
          fill: true,
          fillColor: pathOptions.color,
          fillOpacity: 1.0,
          color: pathOptions.color,
          weight: pathOptions.weight,
          interactive: pathOptions.interactive
        }
      })
    }];

    const decorator = L.polylineDecorator(polyline, { patterns }).addTo(map);

    return () => {

      if(!reverse) {
        map.removeLayer(polyline);
      }

      map.removeLayer(decorator);
    }
  }, [positions, pathOptions, reverse, map])

  return null;
}