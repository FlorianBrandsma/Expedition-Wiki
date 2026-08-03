import { EquipmentItemType } from "../../types/enums";
import { ArmEquipmentItemModel } from './armEquipmentItemModel';
import { GearEquipmentItemModel } from './gearEquipmentItemModel';
import { TrinketEquipmentItemModel } from './trinketEquipmentItemModel';
import { EffectModel } from "./effectModel";
import { EquipmentSetModel } from "./equipmentSetModel";
import { ClassModel } from "./classModel";

export class EquipmentItemModel {

  type!: number;

  elementType!: number;

  health!: number;
  mana!: number;
  physicalAttack!: number;
  magicalAttack!: number;
  physicalDefence!: number;
  magicalDefence!: number;

  armEquipmentItemModelList!:     ArmEquipmentItemModel[];
  gearEquipmentItemModelList!:    GearEquipmentItemModel[];
  trinketEquipmentItemModelList!: TrinketEquipmentItemModel[];

  effectModelList!: EffectModel[];
  equipmentSetModelList!: EquipmentSetModel[];

  constructor(init:Partial<EquipmentItemModel>) {  
    Object.assign(this, init);

    this.armEquipmentItemModelList     = this.armEquipmentItemModelList    .map((model) => new ArmEquipmentItemModel    (model));
    this.gearEquipmentItemModelList    = this.gearEquipmentItemModelList   .map((model) => new GearEquipmentItemModel   (model));
    this.trinketEquipmentItemModelList = this.trinketEquipmentItemModelList.map((model) => new TrinketEquipmentItemModel(model));

    this.effectModelList       = this.effectModelList      .map((model) => new EffectModel      (model));
    this.equipmentSetModelList = this.equipmentSetModelList.map((model) => new EquipmentSetModel(model));
	}

  get armEquipmentItemModel(): ArmEquipmentItemModel {  
    return this.armEquipmentItemModelList[0];
  }

  get gearEquipmentItemModel(): GearEquipmentItemModel {  
    return this.gearEquipmentItemModelList[0];
  }
  
  get trinketEquipmentItemModel(): TrinketEquipmentItemModel {  
    return this.trinketEquipmentItemModelList[0];
  }

  get classModelList(): ClassModel[] {  
    return this.armEquipmentItemModel?.classModelList ?? this.gearEquipmentItemModel?.classModelList ?? [];
  }

  typeDescription(): string {
    return `${ EquipmentItemType[this.type] } Equipment`;
  }
}