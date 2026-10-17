import type { EntityWorldInteractableReflectionMovementArrivalType } from "../types/enums";

export interface MapCoordinates {
  x: number;
  z: number;
  variance?: number;
}

export interface PinGroup {
  mapCoordinates: MapCoordinates[];
  arrivalType?: EntityWorldInteractableReflectionMovementArrivalType;
}