import { EventModel } from "./eventModel";
import { ShopItemEventModel } from "./shopItemEventModel";

export class ItemEventModel {

  id!: number;

  type!: number;

  eventName!: string;

  eventModel!: EventModel;

  shopItemEventModelList!: ShopItemEventModel[];

  constructor(init:Partial<ItemEventModel>) {  
    Object.assign(this, init);

    if (this.eventModel) this.eventModel = new EventModel(this.eventModel);

    this.shopItemEventModelList = this.shopItemEventModelList.map((model) => new ShopItemEventModel(model));
  }

  get shopItemEventModel(): ShopItemEventModel {  
    return this.shopItemEventModelList[0];
  }

  get typeDescription(): string {
    return 'Item';
  }
}