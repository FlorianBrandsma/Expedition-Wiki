import { ResourceAmountType, ResourceType } from "../../types/enums";
import { DamageResourceEffectModel } from "./damageResourceEffectModel";

export class UnmitigableDamageResourceEffectModel {

  amountType!: number;

  damageResourceEffectModel!: DamageResourceEffectModel;

  constructor(init:Partial<UnmitigableDamageResourceEffectModel>, damageResourceEffectModel: DamageResourceEffectModel) {  
    Object.assign(this, init);

    this.damageResourceEffectModel = damageResourceEffectModel;
  }

  description(stack: number): string {

    const amount = (this.damageResourceEffectModel.resourceEffectModel?.amount ?? this.damageResourceEffectModel.resourceEffectAmount) * stack;
    const amountTypeSymbol = (ResourceAmountType[this.amountType] === 'Percent' ? "%" : "");

    return `Reduce ${ResourceType[this.damageResourceEffectModel.resourceEffectResourceType]} by ${amount}${amountTypeSymbol}`
  }
};