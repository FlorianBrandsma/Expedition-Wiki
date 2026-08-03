import type { IParameters } from "./interfaces";

export const EquipmentSetRequestType = {
  Custom: 0,
  GetFilterEquipmentSets: 1
}  as const;

export class EquipmentSetParameters implements IParameters {

  readonly dataType: string = "EquipmentSet";

  requestType?: (typeof EquipmentSetRequestType)[keyof typeof EquipmentSetRequestType];

  includeDependencies?: boolean;
  includeEffects?: boolean;
  includeItems?: boolean;

  id?: number[];
  excludeId?: number[];
  gameId?: number[];

  name?: string;

  constructor(init?:Partial<EquipmentSetParameters>) {
    Object.assign(this, init);
  }
}