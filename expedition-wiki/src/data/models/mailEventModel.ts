import { EventModel } from "./eventModel";

export class MailEventModel {

  id!: number;

  eventName!: string;

  eventModel!: EventModel;

  itemQuantity!: number;

  constructor(init:Partial<MailEventModel>) {  
    Object.assign(this, init);

    if (this.eventModel) this.eventModel = new EventModel(this.eventModel);
  }

  get typeDescription(): string {
    return 'Mail';
  }
}