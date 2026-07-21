import type { IParameters } from "./interfaces";

export const AbilityRequestType = {
  Custom: 0,
  GetFilterAbilities: 1
}  as const;

export class AbilityParameters implements IParameters {

  readonly dataType: string = "Ability";

  requestType?: (typeof AbilityRequestType)[keyof typeof AbilityRequestType];

  includeDependencies?: boolean;

  id?: number[];
  excludeId?: number[];
  gameId?: number[];

  abilityType?: number[];
  
  name?: string;

  constructor(init?:Partial<AbilityParameters>) {
    Object.assign(this, init);
  }
}