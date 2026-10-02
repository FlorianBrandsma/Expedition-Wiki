import { EventModel } from "./eventModel";

export class RestEventModel {

  id!: number;

  quantity!: string;
  
  eventName!: string;

  itemName!: string;
  
  itemAssetIconResourceName!: string;
  
  eventModelList!: EventModel[];

  constructor(init:Partial<RestEventModel>) {  
    Object.assign(this, init);

    this.eventModelList = this.eventModelList.map((model) => new EventModel(model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get typeDescription(): string {
    return 'Rest';
  }

  get quantityDescription(): string {
    return `${this.quantity} / hr`;
  }
}