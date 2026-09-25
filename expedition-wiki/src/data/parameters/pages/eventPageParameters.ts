import type { IParameters } from "../interfaces";

export class EventPageParameters implements IParameters {

  readonly dataType: string = 'EventPage';

  gameId?: number[];

  regionName?: string;
  terrainName?: string;

  questName?: string;
  objectiveName?: string;
  
  worldInteractableType?: number;
  worldInteractableParentType?: number;

  interactableName?: string;

  taskName?: string;

  interactionIsDefault?: boolean;
  interactionStartTime?: number;
  interactionEndTime?: number;

  eventParentType?: number;
  eventName?: string;

  constructor(init?:Partial<EventPageParameters>) {
    Object.assign(this, init);
  }
}