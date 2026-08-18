import { ItemModel } from "./itemModel";

export class TradeItemEventItemModel {

  relinquishQuantity!: number;

  itemModelList!: ItemModel[];

  constructor(init:Partial<TradeItemEventItemModel>) {  
    Object.assign(this, init);

    this.itemModelList = this.itemModelList.map((model) => new ItemModel(model));
  }
}