import { HttpError } from './dataManager';

declare module '@tanStack/react-query' {
  interface Register {
    defaultError: HttpError
  }
}

declare module 'leaflet' {
  
  export interface ArrowHeadSymbolOptions {
    pixelSize?: number;
    polygon?: boolean;
    headAngle?: number;
    angleCorrection?: number;
    pathOptions?: L.PathOptions;
  }

  export interface ArrowHeadSymbolInstance extends L.Layer {}

  export const Symbol: {
    arrowHead: (options?: ArrowHeadSymbolOptions) => ArrowHeadSymbolInstance;
  };

  export interface PolylinePattern {
    offset: string | number;
    repeat: string | number;
    symbol: ArrowHeadSymbolInstance;
  }

  export function polylineDecorator(
    polyline: L.Polyline | L.Polygon | L.LatLng[],
    options?: {
      patterns: PolylinePattern[];
    }
  ): L.Layer;
}