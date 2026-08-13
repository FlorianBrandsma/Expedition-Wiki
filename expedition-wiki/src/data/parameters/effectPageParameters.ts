import type { IParameters } from "./interfaces";

export class EffectPageParameters implements IParameters {

  readonly dataType: string = 'EffectPage';

  gameId?: number[];
  
  name?: string;

  constructor(init?:Partial<EffectPageParameters>) {
    Object.assign(this, init);
  }
}