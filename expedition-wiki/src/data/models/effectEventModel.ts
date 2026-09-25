import { EventModel } from "./eventModel";

export class EffectEventModel {

  id!: number;

  eventName!: string;

  eventModel!: EventModel;

  effectStack!: number;

  constructor(init:Partial<EffectEventModel>) {  
    Object.assign(this, init);

    if (this.eventModel) this.eventModel = new EventModel(this.eventModel);
  }

  get typeDescription(): string {
    return 'Effect';
  }
}