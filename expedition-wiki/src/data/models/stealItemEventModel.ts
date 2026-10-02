import { EventModel } from "./eventModel";
import { ItemEventModel } from "./itemEventModel";

export class StealItemEventModel {

  id!: number;

  itemEventModelList!: ItemEventModel[];

  eventModelList!: EventModel[];

  constructor(init:Partial<StealItemEventModel>) {  
    Object.assign(this, init);

    this.itemEventModelList = this.itemEventModelList.map((model) => new ItemEventModel(model));

    this.eventModelList     = this.eventModelList    .map((model) => new EventModel    (model));
  }

  get itemEventModel(): ItemEventModel {
    return this.itemEventModelList[0];
  }

  get eventModel(): EventModel {
    return this.eventModelList[0]
  }

  get typeDescription(): string {
    return 'Steal Item';
  }
}