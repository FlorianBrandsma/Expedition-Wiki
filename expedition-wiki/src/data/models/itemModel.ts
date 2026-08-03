import { ItemType, ItemComponentType } from "../../types/enums";
import { SupplyItemModel } from "./supplyItemModel";
import { EquipmentItemModel } from './equipmentItemModel';
import type { ClassModel } from "./classModel";
import { ItemComponentModel } from "./itemComponentModel";

export class ItemModel {

  id!: number;

  type!: number;

  name!: string;
  description!: string;

  quantityLimit!: number;
  baseValue!: number;

  assetType!: number;
  assetResourceName!: string;
  assetIconResourceName!: string;

  quantity!: number;

  supplyItemModelList!:    SupplyItemModel[];
  equipmentItemModelList!: EquipmentItemModel[];

  itemComponentModelList!: ItemComponentModel[];
  componentItemModelList!: ItemModel[];

  constructor(init:Partial<ItemModel>) {  
    Object.assign(this, init);

    this.baseValue = Number(init.baseValue!.toFixed(2));

    this.supplyItemModelList    = this.supplyItemModelList   .map((model) => new SupplyItemModel   (model));
    this.equipmentItemModelList = this.equipmentItemModelList.map((model) => new EquipmentItemModel(model));

    this.itemComponentModelList = this.itemComponentModelList.map((model) => new ItemComponentModel(model));
    this.componentItemModelList = this.componentItemModelList.map((model) => new ItemModel         (model));
  }

  get supplyItemModel(): SupplyItemModel {  
    return this.supplyItemModelList[0];
  }

  get equipmentItemModel(): EquipmentItemModel {  
    return this.equipmentItemModelList[0];
  }

  get classModelList(): ClassModel[] {  
    return this.supplyItemModel?.classModelList ?? this.equipmentItemModel?.classModelList ?? [];
  }

  get createItemComponentModelList(): ItemComponentModel[] {
    return this.itemComponentModelList?.filter(x => ItemComponentType[x.type] == 'Create') ?? [];
  }

  get scrapItemComponentModelList(): ItemComponentModel[] {
    return this.itemComponentModelList?.filter(x => ItemComponentType[x.type] == 'Scrap') ?? [];
  }

  get typeDescription(): string {

    switch (ItemType[this.type])
    {
      case 'Supply':    return this.supplyItemModel   !.typeDescription();
      case 'Equipment': return this.equipmentItemModel!.typeDescription();
      case 'Good':      return "Good";
      case 'Currency':  return "Currency";
    }
  }
};