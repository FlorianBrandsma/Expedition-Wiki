import { EventModel } from "../eventModel";

export class EventPageModel {

  eventModel!: EventModel;

  constructor(init:Partial<EventPageModel>) {  
    Object.assign(this, init);

    if(this.eventModel) this.eventModel = new EventModel(this.eventModel);
  }
}