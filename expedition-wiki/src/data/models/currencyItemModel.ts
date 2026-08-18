export class CurrencyItemModel {
  
  id!: number;

  itemName!: string;

  itemBaseValue!: number;

  itemAssetIconResourceName!: string;

  constructor(init:Partial<CurrencyItemModel>) {  
    Object.assign(this, init);
  }
}