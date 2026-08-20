import type { IParameters } from "../interfaces";

export class AbilityPageParameters implements IParameters {

  readonly dataType: string = 'AbilityPage';

  gameId?: number[];
  
  name?: string;

  constructor(init?:Partial<AbilityPageParameters>) {
    Object.assign(this, init);
  }
}