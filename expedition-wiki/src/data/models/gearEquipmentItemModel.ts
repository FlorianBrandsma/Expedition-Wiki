import { ClassModel } from "./classModel";

import { GearEquipmentItemType, GearEquipmentItemMaterialType } from "../../types/enums";

export class GearEquipmentItemModel {

  id!: number;
  type!: number;
  materialType!: number;

  classModelList!: ClassModel[];

  constructor(init:Partial<GearEquipmentItemModel>) {  
    Object.assign(this, init);

    this.classModelList = this.classModelList.map((model) => new ClassModel(model));
  }

  typeDescription(): string {
    return GearEquipmentItemType[this.type];
  }

  materialTypeDescription(): string {
    return GearEquipmentItemMaterialType[this.materialType];
  }
}