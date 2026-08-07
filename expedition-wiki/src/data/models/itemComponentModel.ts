export class ItemComponentModel {

  id!: number;

  type!: number;
  
  quantity!: number;

  componentItemName!: string;
  componentItemAssetIconResourceName!: string;

  constructor(init:Partial<ItemComponentModel>) {  
    Object.assign(this, init);
  }
};