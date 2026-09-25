import { EventModel } from "./eventModel";

export class ReputationEventModel {

  id!: number;

  eventName!: string;
  
  eventModel!: EventModel;

  factionReputation!: number;

  constructor(init:Partial<ReputationEventModel>) {  
    Object.assign(this, init);

    if (this.eventModel) this.eventModel = new EventModel(this.eventModel);
  }

  get typeDescription(): string {
    return 'Reputation';
  }
}