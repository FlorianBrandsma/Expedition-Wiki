export class ItemComponentModel {

  type!: number;
  
  quantity!: number;

  componentItemName!: string;
  componentItemAssetIconResourceName!: string;

  constructor(init:Partial<ItemComponentModel>) {  
    Object.assign(this, init);
  }
}