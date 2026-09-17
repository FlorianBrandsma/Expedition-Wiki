import type { IParameters } from "../interfaces";

export class ObjectivePageParameters implements IParameters {

  readonly dataType: string = 'ObjectivePage';

  gameId?: number[];
  
  objectiveName?: string;
  questName?: string;

  constructor(init?:Partial<ObjectivePageParameters>) {
    Object.assign(this, init);
  }
}