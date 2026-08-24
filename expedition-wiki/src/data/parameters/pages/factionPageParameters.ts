import type { IParameters } from "../interfaces";

export class FactionPageParameters implements IParameters {

  readonly dataType: string = 'FactionPage';

  gameId?: number[];
  
  name?: string;

  constructor(init?:Partial<FactionPageParameters>) {
    Object.assign(this, init);
  }
}