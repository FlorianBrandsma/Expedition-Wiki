import { EquipmentItemType } from "../../types/enums";
import { ArmEquipmentItemModel } from './armEquipmentItemModel';
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

  itemName!: string;
  itemAssetIconResourceName!: string;

  statusEffectStack!: number;

  armEquipmentItemModelList!:     ArmEquipmentItemModel[];
  gearEquipmentItemModelList!:    GearEquipmentItemModel[];
  trinketEquipmentItemModelList!: TrinketEquipmentItemModel[];

  constructor(init:Partial<EquipmentItemModel>) {  
    Object.assign(this, init);

    this.armEquipmentItemModelList     = this.armEquipmentItemModelList    .map((model) => new ArmEquipmentItemModel    (model));
    this.gearEquipmentItemModelList    = this.gearEquipmentItemModelList   .map((model) => new GearEquipmentItemModel   (model));
    this.trinketEquipmentItemModelList = this.trinketEquipmentItemModelList.map((model) => new TrinketEquipmentItemModel(model));
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

  get typeDescription(): string {
    return `${ EquipmentItemType[this.type] } Equipment`;
  }
}