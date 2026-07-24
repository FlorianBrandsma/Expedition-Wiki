import { SupplyItemType } from "../../types/enums";
import { ClassModel } from "./classModel";

export class SupplyItemModel {

  id!: number;
  type!: number;

  classModelList!: ClassModel[];

  constructor(init:Partial<SupplyItemModel>) {  
    Object.assign(this, init);

    this.classModelList = this.classModelList.map((model) => new ClassModel(model));
	}

  description(): string {
      
    switch (SupplyItemType[this.type])
    {
      case 'Usable':     return "Usable Supply";
      case 'Consumable': return "Consumable Supply";
    }
  }
}