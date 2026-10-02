import { EventModel } from "./eventModel";

export class MenuEventModel {

  eventModelList!: EventModel[];

  constructor(init:Partial<MenuEventModel>) {  
    Object.assign(this, init);

    this.eventModelList = this.eventModelList.map((model) => new EventModel(model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get typeDescription(): string {
    return 'Menu';
  }
}