import { ClassModel } from "./classModel";

import { ArmEquipmentItemType } from "../../types/enums";

import { ArmEquipmentGroupList } from '../../services/typeManager';
import { AbilityModel } from "./abilityModel";

export class ArmEquipmentItemModel {

  type!: number;

  chargeAbilityModelList!: AbilityModel[];
  dischargeAbilityModelList!: AbilityModel[];
  
  classModelList!: ClassModel[];

  constructor(init:Partial<ArmEquipmentItemModel>) {  
    Object.assign(this, init);

    this.chargeAbilityModelList    = this.chargeAbilityModelList   .map((model) => new AbilityModel(model));
    this.dischargeAbilityModelList = this.dischargeAbilityModelList.map((model) => new AbilityModel(model));
    
    this.classModelList = this.classModelList.map((model) => new ClassModel(model));
  }

  typeDescription(): string {
    return ArmEquipmentItemType[this.type];
  }

  gripTypeDescription(): string {
    return String(ArmEquipmentGroupList.find(x => x.ArmEquipmentItemType == ArmEquipmentItemType[this.type])?.ArmEquipmentItemGripType);
  }
}