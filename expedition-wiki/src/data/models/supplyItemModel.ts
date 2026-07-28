import { SupplyItemType } from "../../types/enums";
import { AbilityModel } from "./abilityModel";
import { ClassModel } from "./classModel";

export class SupplyItemModel {

  type!: number;

  abilityModelList!: AbilityModel[];

  classModelList!: ClassModel[];

  abilityModel?: AbilityModel;

  constructor(init:Partial<SupplyItemModel>) {  
    Object.assign(this, init);

    this.abilityModelList = this.abilityModelList.map((model) => new AbilityModel(model));
    this.classModelList   = this.classModelList  .map((model) => new ClassModel  (model));

    this.abilityModel = this.abilityModelList[0];
	}

  description(): string {
      
    switch (SupplyItemType[this.type])
    {
      case 'Usable':     return "Usable Supply";
      case 'Consumable': return "Consumable Supply";
    }
  }
}