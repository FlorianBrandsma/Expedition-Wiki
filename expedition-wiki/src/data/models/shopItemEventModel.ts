export class ShopItemEventModel {

  id!: string;

  eventName!: string;

  currencyItemName!: string;
  
  currencyItemBaseValue!: number;

  currencyItemAssetIconResourceName!: string;

  constructor(init:Partial<ShopItemEventModel>) {  
    Object.assign(this, init);
  }

  get rate(): number {
    return Number(0.5);
  }

  get rateDescription(): string {
    return this.rate.toFixed(2);
  }
}