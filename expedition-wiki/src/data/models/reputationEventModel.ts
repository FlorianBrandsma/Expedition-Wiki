import { EventModel } from "./eventModel";

export class ReputationEventModel {

  id!: number;

  eventName!: string;
  
  factionReputation!: number;
  
  eventModelList!: EventModel[];

  constructor(init:Partial<ReputationEventModel>) {  
    Object.assign(this, init);

    this.eventModelList = this.eventModelList.map((model) => new EventModel(model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get typeDescription(): string {
    return 'Reputation';
  }
}