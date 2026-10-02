import { EventModel } from "./eventModel";

export class TransportEventModel {

  id!: number;

  regionName!: string;
  terrainName!: string;

  eventModelList!: EventModel[];

  constructor(init:Partial<TransportEventModel>) {  
    Object.assign(this, init);

    this.eventModelList = this.eventModelList.map((model) => new EventModel(model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get typeDescription(): string {
    return 'Transport';
  }
}