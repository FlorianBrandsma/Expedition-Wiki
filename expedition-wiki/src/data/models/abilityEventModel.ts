import { EventModel } from "./eventModel";

export class AbilityEventModel {

  id!: number;

  eventName!: string;

  eventModel!: EventModel;

  constructor(init:Partial<AbilityEventModel>) {  
    Object.assign(this, init);

    if (this.eventModel) this.eventModel = new EventModel(this.eventModel);
  }

  get typeDescription(): string {
    return 'Ability';
  }
}