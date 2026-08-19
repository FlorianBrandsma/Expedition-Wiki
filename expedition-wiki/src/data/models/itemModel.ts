import { ItemType } from "../../types/enums";
import { SupplyItemModel } from "./supplyItemModel";
import { EquipmentItemModel } from './equipmentItemModel';

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

  itemComponentType!: number;

  supplyItemModelList!:    SupplyItemModel[];
  equipmentItemModelList!: EquipmentItemModel[];

  itemModelList!: ItemModel[]

  constructor(init:Partial<ItemModel>) {  
    Object.assign(this, init);

    this.baseValue = Number(init.baseValue!.toFixed(2));

    this.supplyItemModelList    = this.supplyItemModelList   .map((model) => new SupplyItemModel   (model));
    this.equipmentItemModelList = this.equipmentItemModelList.map((model) => new EquipmentItemModel(model));

    this.itemModelList          = this.itemModelList         .map((model) => new ItemModel         (model));
  }

  get supplyItemModel(): SupplyItemModel {  
    return this.supplyItemModelList[0];
  }

  get equipmentItemModel(): EquipmentItemModel {  
    return this.equipmentItemModelList[0];
  }

  get elementType(): number {
    return this.equipmentItemModel?.elementType ?? 0;
  }

  componentItemModelList(type: number): ItemModel[] {
    return this.itemModelList?.filter(x => x.itemComponentType === type) ?? [];
  }

  get typeDescription(): string {

    switch (ItemType[this.type])
    {
      case 'Supply':    return this.supplyItemModel   !.typeDescription;
      case 'Equipment': return this.equipmentItemModel!.typeDescription;
      case 'Good':      return "Good";
      case 'Currency':  return "Currency";
    }
  }
}