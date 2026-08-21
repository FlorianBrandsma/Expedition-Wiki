import type { IParameters } from "../interfaces";

export class EquipmentSetPageParameters implements IParameters {

  readonly dataType: string = 'EquipmentSetPage';

  gameId?: number[];
  
  name?: string;

  constructor(init?:Partial<EquipmentSetPageParameters>) {
    Object.assign(this, init);
  }
}