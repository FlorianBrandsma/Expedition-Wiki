import { GearEquipmentItemType, GearEquipmentItemMaterialType } from "../../types/enums";

export class GearEquipmentItemModel {

  type!: number;
  materialType!: number;

  constructor(init:Partial<GearEquipmentItemModel>) {  
    Object.assign(this, init);
  }

  typeDescription(): string {
    return GearEquipmentItemType[this.type];
  }

  materialTypeDescription(): string {
    return GearEquipmentItemMaterialType[this.materialType];
  }
}