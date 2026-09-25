import { EventModel } from "./eventModel";

export class RestEventModel {

  id!: number;

  quantity!: string;
  
  eventName!: string;

  eventModel!: EventModel;

  constructor(init:Partial<RestEventModel>) {  
    Object.assign(this, init);

    if (this.eventModel) this.eventModel = new EventModel(this.eventModel);
  }

  get typeDescription(): string {
    return 'Rest';
  }
}