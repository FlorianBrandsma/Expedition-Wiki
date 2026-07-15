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

  typeDescription: string;

  supplyItemModelList!: SupplyItemModel[];
  equipmentItemModelList!: EquipmentItemModel[];

  supplyItemModel?: SupplyItemModel;
  equipmentItemModel?: EquipmentItemModel;

  constructor(init:Partial<ItemModel>) {  
    Object.assign(this, init);

    this.baseValue = Number(init.baseValue!.toFixed(2));

    this.supplyItemModelList    = this.supplyItemModelList   .map((model) => new SupplyItemModel   (model));
    this.equipmentItemModelList = this.equipmentItemModelList.map((model) => new EquipmentItemModel(model));

    this.supplyItemModel    = this.supplyItemModelList[0];
    this.equipmentItemModel = this.equipmentItemModelList[0];

    this.typeDescription = this.getTypeDescription();
  }

  getTypeDescription(): string {

    switch (ItemType[this.type])
    {
      case 'Supply':    return this.supplyItemModelList   [0].description();
      case 'Equipment': return this.equipmentItemModelList[0].description();
      case 'Good':      return "Good";
      case 'Currency':  return "Currency";
    }
  }
};