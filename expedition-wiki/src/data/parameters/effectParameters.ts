import type { IParameters } from "./interfaces";

export const EffectRequestType = {
  Custom: 0,
  GetFilterEffects: 1
}  as const;

export class EffectParameters implements IParameters {

  readonly dataType: string = "Effect";

  requestType?: (typeof EffectRequestType)[keyof typeof EffectRequestType];

  includeDependencies?: boolean;

  id?: number[];
  excludeId?: number[];
  gameId?: number[];

  effectType?: number[];
  
  name?: string;

  constructor(init?:Partial<EffectParameters>) {
    Object.assign(this, init);
  }
}