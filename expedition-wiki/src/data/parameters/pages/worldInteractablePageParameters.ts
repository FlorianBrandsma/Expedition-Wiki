import type { IParameters } from "../interfaces";

export class WorldInteractablePageParameters implements IParameters {

  readonly dataType: string = 'WorldInteractablePage';

  gameId?: number[];
  
  regionName?: string;
  terrainName?: string;

  questName?: string;
  objectiveName?: string;
  
  interactableName?: string;

  worldInteractableType?: number;
  worldInteractableParentType?: number;

  constructor(init?:Partial<WorldInteractablePageParameters>) {
    Object.assign(this, init);
  }
}