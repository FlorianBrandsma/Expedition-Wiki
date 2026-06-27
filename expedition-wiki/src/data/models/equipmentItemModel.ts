import { EquipmentItemType } from "../../types/enums";

export class EquipmentItemModel {

  id!: number;
  type!: number;

  constructor(init:Partial<EquipmentItemModel>) {  
    Object.assign(this, init);
	}

  description(): string {
    
    switch (EquipmentItemType[this.type])
    {
      case 'Arm':     return "Arm Equipment";
      case 'Gear':    return "Gear Equipment";
      case 'Trinket': return "Trinket Equipment";
    }
  }
}