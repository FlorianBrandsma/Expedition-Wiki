import { EventModel } from "./eventModel";

export class SignalEventModel {

  responseEventModelList!: EventModel[];

  constructor(init:Partial<SignalEventModel>) {  
    Object.assign(this, init);

    this.responseEventModelList = this.responseEventModelList.map((model) => new EventModel(model));
  }

  get responseEventModel(): EventModel {
    return this.responseEventModelList[0];
  }

  get typeDescription(): string {
    return 'Signal';
  }
}