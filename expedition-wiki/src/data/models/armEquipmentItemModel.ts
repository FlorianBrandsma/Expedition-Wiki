import { ArmEquipmentItemType } from "../../types/enums";

import { ArmEquipmentGroupList } from '../../services/typeManager';

export class ArmEquipmentItemModel {

  id!: number;

  type!: number;

  equipmentItemName!: string;
  equipmentItemAssetIconResourceName!: string;

  constructor(init:Partial<ArmEquipmentItemModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return ArmEquipmentItemType[this.type];
  }

  get gripTypeDescription(): string {
    return String(ArmEquipmentGroupList.find(x => x.ArmEquipmentItemType == ArmEquipmentItemType[this.type])?.ArmEquipmentItemGripType);
  }
}