import { ItemType } from "../../types/enums";
import { SupplyItemModel } from "./supplyItemModel";
import { EquipmentItemModel } from './equipmentItemModel';

export class ItemModel {
  id!: number;
  type!: number;
  name!: string;
  description!: string;

  typeDescription: string;

  supplyItemModelList!: SupplyItemModel[];
  equipmentItemModelList!: EquipmentItemModel[];

  constructor(init:Partial<ItemModel>) {  
    Object.assign(this, init);

    this.supplyItemModelList    = this.supplyItemModelList   .map((supplyItemModel)    => new SupplyItemModel   (supplyItemModel));
    this.equipmentItemModelList = this.equipmentItemModelList.map((equipmentItemModel) => new EquipmentItemModel(equipmentItemModel));

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