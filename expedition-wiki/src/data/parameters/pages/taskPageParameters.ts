import type { IParameters } from "../interfaces";

export class TaskPageParameters implements IParameters {

  readonly dataType: string = 'TaskPage';

  gameId?: number[];
  
  regionName?: string;
  terrainName?: string;

  questName?: string;
  objectiveName?: string;
  
  interactableName?: string;

  taskName?: string;

  worldInteractableType?: number;
  worldInteractableParentType?: number;

  constructor(init?:Partial<TaskPageParameters>) {
    Object.assign(this, init);
  }
}