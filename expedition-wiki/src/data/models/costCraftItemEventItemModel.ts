export class CostCraftItemEventItemModel {

  quantity!: number;

  itemName!: string;

  itemIconResourceName!: string;

  constructor(init:Partial<CostCraftItemEventItemModel>) {  
    Object.assign(this, init);
  }
}