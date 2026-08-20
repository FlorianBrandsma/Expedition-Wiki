import { ChargeAbilityType, ArmEquipmentItemType } from "../../types/enums";

import { CaseConditionModel } from "./caseConditionModel";

export class ChargeAbilityModel {

  type!: number;
  
  armEquipmentItemType!: number;

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<ChargeAbilityModel>) {  
    Object.assign(this, init);

    this.caseConditionModelList = this.caseConditionModelList.map((model) => new CaseConditionModel(model));
  }

  get typeDescription(): string {
    return `${ ChargeAbilityType[this.type] } Charge`;
  }

  get armEquipmentItemTypeDescription(): string {
    return `${ ArmEquipmentItemType[this.armEquipmentItemType] }`;
  }

  get relationshipTypeDescription(): string {
    return 'Opponent, active';
  }
}