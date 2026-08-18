export class ShopItemEventItemModel {

  rate!: number;

  itemBaseValue!: number;

  shopItemEventCurrencyItemName!: string;
  shopItemEventCurrencyItemBaseValue!: number;
  shopItemEventCurrencyItemAssetIconResourceName!: string;

  constructor(init:Partial<ShopItemEventItemModel>) {  
    Object.assign(this, init);
  }

  get value(): number {
    return (this.itemBaseValue / this.shopItemEventCurrencyItemBaseValue) * this.rate;
  }
}