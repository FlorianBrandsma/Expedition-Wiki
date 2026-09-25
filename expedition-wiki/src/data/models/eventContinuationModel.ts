import { CaseConditionModel } from "./caseConditionModel";
import { EventModel } from "./eventModel";

export class EventContinuationModel {

  id!: number;

  type!: number;
  targetType!: number;
  activationType!: number;

  eventName!: string;

  eventModel!: EventModel;
  
  continuationEventName!: string;
  
  continuationEventModel!: EventModel;

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<EventContinuationModel>) {  
    Object.assign(this, init);

    if (this.eventModel)             this.eventModel             = new EventModel(this.eventModel);
    if (this.continuationEventModel) this.continuationEventModel = new EventModel(this.continuationEventModel);

    this.caseConditionModelList = this.caseConditionModelList.map((model) => new CaseConditionModel(model));
  }
}