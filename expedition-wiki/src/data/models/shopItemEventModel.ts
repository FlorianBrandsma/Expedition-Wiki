import { ItemEventModel } from "./itemEventModel";

export class ShopItemEventModel {

  id!: string;

  eventName!: string;

  itemEventModel!: ItemEventModel;

  currencyItemName!: string;
  
  currencyItemBaseValue!: number;

  currencyItemAssetIconResourceName!: string;

  constructor(init:Partial<ShopItemEventModel>) {  
    Object.assign(this, init);

    if (this.itemEventModel) this.itemEventModel = new ItemEventModel(this.itemEventModel);
  }

  get rate(): number {
    return Number(0.5);
  }

  get rateDescription(): string {
    return this.rate.toFixed(2);
  }
}