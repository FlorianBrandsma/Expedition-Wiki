import { ItemEventModel } from "./itemEventModel";

export class ShopItemEventModel {

  id!: string;

  eventName!: string;

  currencyItemName!: string;
  
  currencyItemBaseValue!: number;

  currencyItemAssetIconResourceName!: string;

  itemEventModelList!: ItemEventModel[];

  constructor(init:Partial<ShopItemEventModel>) {  
    Object.assign(this, init);

    this.itemEventModelList = this.itemEventModelList.map((model) => new ItemEventModel(model));
  }

  get itemEventModel(): ItemEventModel {
    return this.itemEventModelList[0];
  }

  get rate(): number {
    return Number(0.5);
  }

  get rateDescription(): string {
    return this.rate.toFixed(2);
  }

  get typeDescription(): string {
    return 'Shop Item';
  }
}