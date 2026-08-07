import { ArmEquipmentItemType } from "../../types/enums";

export class ArmDischargeAbilityModel {

  armEquipmentItemType!: number;

  constructor(init:Partial<ArmDischargeAbilityModel>) {  
    Object.assign(this, init);
  }

  get armEquipmentItemTypeDescription(): string {
    return `${ ArmEquipmentItemType[this.armEquipmentItemType] }`;
  }
};