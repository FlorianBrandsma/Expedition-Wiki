import { TrinketEquipmentItemType } from "../../types/enums";

export class TrinketEquipmentItemModel {

  type!: number;

  constructor(init:Partial<TrinketEquipmentItemModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return TrinketEquipmentItemType[this.type];
  }
}