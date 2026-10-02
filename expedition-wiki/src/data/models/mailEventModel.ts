import { EventModel } from "./eventModel";

export class MailEventModel {

  id!: number;

  subjectText!: string;
  message!: string;

  eventName!: string;

  interactableName!: string;
  
  interactableIconResourceName!: string;
  
  itemQuantity!: number;

  eventModelList!: EventModel[];

  constructor(init:Partial<MailEventModel>) {  
    Object.assign(this, init);

    this.eventModelList = this.eventModelList.map((model) => new EventModel(model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get typeDescription(): string {
    return 'Mail';
  }
}