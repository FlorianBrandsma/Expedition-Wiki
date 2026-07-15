import { TrinketEquipmentItemType } from "../../types/enums";

export class TrinketEquipmentItemModel {

  id!: number;
  type!: number;

  constructor(init:Partial<TrinketEquipmentItemModel>) {  
    Object.assign(this, init);
  }

  typeDescription(): string {
    return TrinketEquipmentItemType[this.type];
  }
}