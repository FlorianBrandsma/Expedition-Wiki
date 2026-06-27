import { SupplyItemType } from "../../types/enums";

export class SupplyItemModel {

  id!: number;
  type!: number;

  constructor(init:Partial<SupplyItemModel>) {  
    Object.assign(this, init);
	}

  description(): string {
      
    switch (SupplyItemType[this.type])
    {
      case 'Usable':     return "Usable Supply";
      case 'Consumable': return "Consumable Supply";
    }
  }
}