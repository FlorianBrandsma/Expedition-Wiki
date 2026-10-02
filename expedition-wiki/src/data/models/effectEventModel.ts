import { EventModel } from "./eventModel";

export class EffectEventModel {

  id!: number;

  effectStack!: number;
  
  eventModelList!: EventModel[];

  constructor(init:Partial<EffectEventModel>) {  
    Object.assign(this, init);

    this.eventModelList = this.eventModelList.map((model) => new EventModel(model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get typeDescription(): string {
    return 'Effect';
  }
}