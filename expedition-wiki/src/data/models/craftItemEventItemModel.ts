import { CostCraftItemEventItemModel } from "./costCraftItemEventItemModel";

export class CraftItemEventItemModel {

  type!: number;

  itemBaseValue!: number;

  costCraftItemEventItemModelList!: CostCraftItemEventItemModel[];

  constructor(init:Partial<CraftItemEventItemModel>) {  
    Object.assign(this, init);

    this.costCraftItemEventItemModelList = this.costCraftItemEventItemModelList.map((model) => new CostCraftItemEventItemModel(model));
  }

  get costCraftItemEventItemModel(): CostCraftItemEventItemModel {  
    return this.costCraftItemEventItemModelList[0];
  }
}