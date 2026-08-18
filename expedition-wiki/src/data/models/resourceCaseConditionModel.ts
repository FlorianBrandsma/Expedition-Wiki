import { CaseConditionTargetType, ResourceType, ResourceAmountType, SpatialInequalityType } from "../../types/enums";

export class ResourceCaseConditionModel {

  targetType!: number;

  resourceType!: number;
  inequalityType!: number;

  amount!: number;
  amountType!: number;

  constructor(init:Partial<ResourceCaseConditionModel>) {  
    Object.assign(this, init);
  }

  description(): string {

    const amountTypeSymbol = (ResourceAmountType[this.amountType] === 'Percent' ? "%" : "");

    return `${(CaseConditionTargetType[this.targetType] === 'Self' ? `${ResourceType[this.resourceType]}` : `${CaseConditionTargetType[this.targetType]} ${ResourceType[this.resourceType].toLowerCase()}`)} ${SpatialInequalityType[this.inequalityType].toLowerCase()} ${this.amount}${amountTypeSymbol}`;
  }
}