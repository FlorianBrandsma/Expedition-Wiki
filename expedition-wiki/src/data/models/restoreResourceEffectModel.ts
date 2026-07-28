import { ResourceAmountType, ResourceType } from "../../types/enums";
import { ResourceEffectModel } from "./resourceEffectModel";

export class RestoreResourceEffectModel {

  amountType!: number;

  resourceEffectModel!: ResourceEffectModel;

  constructor(init:Partial<RestoreResourceEffectModel>, resourceEffectModel: ResourceEffectModel) {  
    Object.assign(this, init);

    this.resourceEffectModel = resourceEffectModel;
  }

  description(stack: number): string {

    const amount = this.resourceEffectModel.amount * stack;
    const amountTypeSymbol = (ResourceAmountType[this.amountType] === 'Percent' ? "%" : "");

    return `Restore ${ResourceType[this.resourceEffectModel.resourceType].toLowerCase()} by ${amount}${amountTypeSymbol}`
  }
};