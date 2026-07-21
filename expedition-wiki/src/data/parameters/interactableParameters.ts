import type { IParameters } from "./interfaces";

export const InteractableRequestType = {
  Custom: 0,
  GetFilterInteractables: 1
}  as const;

export class InteractableParameters implements IParameters {

  readonly dataType: string = "Interactable";

  requestType?: (typeof InteractableRequestType)[keyof typeof InteractableRequestType];

  includeDependencies?: boolean;

  id?: number[];
  excludeId?: number[];
  gameId?: number[];

  factionId?: number[];

  interactableType?: number[];
  
  name?: string;

  constructor(init?:Partial<InteractableParameters>) {
    Object.assign(this, init);
  }
}