import { ArmEquipmentItemType } from "../../types/enums";

import { ArmEquipmentGroupList } from '../../services/typeManager';

export class ArmEquipmentItemModel {

  id!: number;
  type!: number;

  constructor(init:Partial<ArmEquipmentItemModel>) {  
    Object.assign(this, init);
  }

  typeDescription(): string {
    return ArmEquipmentItemType[this.type];
  }

  gripTypeDescription(): string {
    return String(ArmEquipmentGroupList.find(x => x.ArmEquipmentItemType == ArmEquipmentItemType[this.type])?.ArmEquipmentItemGripType);
  }
}