import { CaseConditionModel } from "./caseConditionModel";
import { EventModel } from "./eventModel";

export class EventContinuationModel {

  id!: number;

  type!: number;
  targetType!: number;
  activationType!: number;

  eventName!: string;

  continuationEventName!: string;
  
  caseConditionModelList!: CaseConditionModel[];

  eventModelList!: EventModel[];

  continuationEventModelList!: EventModel[];

  constructor(init:Partial<EventContinuationModel>) {  
    Object.assign(this, init);

    this.caseConditionModelList     = this.caseConditionModelList    .map((model) => new CaseConditionModel(model));

    this.eventModelList             = this.eventModelList            .map((model) => new EventModel        (model));

    this.continuationEventModelList = this.continuationEventModelList.map((model) => new EventModel        (model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get continuationEventModel(): EventModel {
    return this.continuationEventModelList[0];
  }
}