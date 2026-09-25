import { EventModel } from "./eventModel";

export class CompanionEventModel {

  id!: number;

  eventName!: string;

  eventModel!: EventModel;

  constructor(init:Partial<CompanionEventModel>) {  
    Object.assign(this, init);

    if (this.eventModel) this.eventModel = new EventModel(this.eventModel);
  }

  get typeDescription(): string {
    return 'Companion';
  }
}