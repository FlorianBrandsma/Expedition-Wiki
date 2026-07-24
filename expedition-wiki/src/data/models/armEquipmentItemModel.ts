import { ClassModel } from "./classModel";

import { ArmEquipmentItemType } from "../../types/enums";

import { ArmEquipmentGroupList } from '../../services/typeManager';

export class ArmEquipmentItemModel {

  id!: number;
  type!: number;

  classModelList!: ClassModel[];

  constructor(init:Partial<ArmEquipmentItemModel>) {  
    Object.assign(this, init);

    this.classModelList = this.classModelList.map((model) => new ClassModel(model));
  }

  typeDescription(): string {
    return ArmEquipmentItemType[this.type];
  }

  gripTypeDescription(): string {
    return String(ArmEquipmentGroupList.find(x => x.ArmEquipmentItemType == ArmEquipmentItemType[this.type])?.ArmEquipmentItemGripType);
  }
}