import { EventModel } from "./eventModel";
import { MenuEventModel } from "./menuEventModel";

export class MenuEventEntryModel {

  id!: number;

  name!: string;

  menuEventModelList!: MenuEventModel[];

  continuationEventModelList!: EventModel[];

  constructor(init:Partial<MenuEventEntryModel>) {  
    Object.assign(this, init);

    this.menuEventModelList         = this.menuEventModelList        .map((model) => new MenuEventModel(model));

    this.continuationEventModelList = this.continuationEventModelList.map((model) => new EventModel    (model));
  }

  get menuEventModel(): MenuEventModel {
    return this.menuEventModelList[0];
  }

  get continuationEventModel(): EventModel {
    return this.continuationEventModelList[0];
  }
}