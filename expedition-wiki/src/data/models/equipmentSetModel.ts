import { EffectModel } from "./effectModel";

import { ItemModel } from "./itemModel";

export class EquipmentSetModel {

  id!: number;

  name!: string;

  itemModelList!: ItemModel[];
  effectModelList!: EffectModel[];

  constructor(init:Partial<EquipmentSetModel>) {  
    Object.assign(this, init);

    this.itemModelList   = this.itemModelList  .map((model) => new ItemModel  (model));
    this.effectModelList = this.effectModelList.map((model) => new EffectModel(model));
  }

  get iconResourceName(): string {  
    return this.itemModelList[0].assetIconResourceName;
  }
}