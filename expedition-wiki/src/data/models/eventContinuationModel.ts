import { CaseConditionModel } from "./caseConditionModel";

export class EventContinuationModel {

  id!: number;

  type!: number;
  targetType!: number;
  activationType!: number;

  eventName!: string;
  continuationEventName!: string;

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<EventContinuationModel>) {  
    Object.assign(this, init);

    this.caseConditionModelList = this.caseConditionModelList.map((model) => new CaseConditionModel(model));
  }
}