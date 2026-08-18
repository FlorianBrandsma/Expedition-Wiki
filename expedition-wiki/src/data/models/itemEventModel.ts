import { ItemEventItemModel } from "./itemEventItemModel";
import { ShopItemEventModel } from "./shopItemEventModel";

export class ItemEventModel {

  id!: number;

  type!: number;

  eventName!: string;

  itemEventItemModel!: ItemEventItemModel;

  shopItemEventModelList!: ShopItemEventModel[];

  constructor(init:Partial<ItemEventModel>) {  
    Object.assign(this, init);

    this.itemEventItemModel = new ItemEventItemModel(this.itemEventItemModel);

    this.shopItemEventModelList = this.shopItemEventModelList.map((model) => new ShopItemEventModel(model));
  }

  get shopItemEventModel(): ShopItemEventModel {  
    return this.shopItemEventModelList[0];
  }

  get typeDescription(): string {
    return 'Item Event';
  }
}