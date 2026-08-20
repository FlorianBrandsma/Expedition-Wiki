import { GearEquipmentItemType, GearEquipmentItemMaterialType } from "../../types/enums";

export class GearEquipmentItemModel {

  type!: number;
  materialType!: number;

  constructor(init:Partial<GearEquipmentItemModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return GearEquipmentItemType[this.type];
  }

  get materialTypeDescription(): string {
    return GearEquipmentItemMaterialType[this.materialType];
  }
}