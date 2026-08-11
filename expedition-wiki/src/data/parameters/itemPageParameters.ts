import type { IParameters } from "./interfaces";

export class ItemPageParameters implements IParameters {

  readonly dataType: string = 'ItemPage';

  gameId?: number[];
  
  name?: string;

  constructor(init?:Partial<ItemPageParameters>) {
    Object.assign(this, init);
  }
}