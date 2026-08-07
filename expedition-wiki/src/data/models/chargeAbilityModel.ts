import { ChargeAbilityType, ArmEquipmentItemType } from "../../types/enums";

export class ChargeAbilityModel {

  type!: number;
  
  armEquipmentItemType!: number;

  constructor(init:Partial<ChargeAbilityModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return `${ ChargeAbilityType[this.type] } Charge`;
  }

  get armEquipmentItemTypeDescription(): string {
    return `${ ArmEquipmentItemType[this.armEquipmentItemType] }`;
  }
};