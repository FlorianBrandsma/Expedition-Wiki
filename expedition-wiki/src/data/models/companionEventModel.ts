import { EventModel } from "./eventModel";

export class CompanionEventModel {

  id!: number;

  eventName!: string;

  eventModelList!: EventModel[];

  constructor(init:Partial<CompanionEventModel>) {  
    Object.assign(this, init);

    this.eventModelList = this.eventModelList.map((model) => new EventModel(model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get typeDescription(): string {
    return 'Companion';
  }
}