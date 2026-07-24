import { EquipmentItemType } from "../../types/enums";
import { ArmEquipmentItemModel } from './armEquipmentItemModel';
import type { ClassModel } from "./classModel";
import { GearEquipmentItemModel } from './gearEquipmentItemModel';
import { TrinketEquipmentItemModel } from './trinketEquipmentItemModel';

export class EquipmentItemModel {

  id!: number;
  type!: number;

  elementType!: number;

  health!: number;
  mana!: number;
  physicalAttack!: number;
  magicalAttack!: number;
  physicalDefence!: number;
  magicalDefence!: number;

  armEquipmentItemModelList!: ArmEquipmentItemModel[];
  gearEquipmentItemModelList!: GearEquipmentItemModel[];
  trinketEquipmentItemModelList!: TrinketEquipmentItemModel[];

  armEquipmentItemModel?: ArmEquipmentItemModel;
  gearEquipmentItemModel?: GearEquipmentItemModel;
  trinketEquipmentItemModel?: TrinketEquipmentItemModel;

  constructor(init:Partial<EquipmentItemModel>) {  
    Object.assign(this, init);

    this.armEquipmentItemModelList     = this.armEquipmentItemModelList    .map((model) => new ArmEquipmentItemModel    (model));
    this.gearEquipmentItemModelList    = this.gearEquipmentItemModelList   .map((model) => new GearEquipmentItemModel   (model));
    this.trinketEquipmentItemModelList = this.trinketEquipmentItemModelList.map((model) => new TrinketEquipmentItemModel(model));

    this.armEquipmentItemModel     = this.armEquipmentItemModelList[0];
    this.gearEquipmentItemModel    = this.gearEquipmentItemModelList[0];
    this.trinketEquipmentItemModel = this.trinketEquipmentItemModelList[0];
	}

  get classModelList(): ClassModel[] {  
    return this.armEquipmentItemModel?.classModelList ?? this.gearEquipmentItemModel?.classModelList ?? [];
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