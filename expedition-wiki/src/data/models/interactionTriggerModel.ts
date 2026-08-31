import { CaseConditionModel } from "./caseConditionModel";

export class InteractionTriggerModel {

  id!: number;

  type!: number;
  targetType!: number;
  activationType!: number;

  eventName!: string;

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<InteractionTriggerModel>) {  
    Object.assign(this, init);

    this.caseConditionModelList = this.caseConditionModelList.map((model) => new CaseConditionModel(model));
  }
}