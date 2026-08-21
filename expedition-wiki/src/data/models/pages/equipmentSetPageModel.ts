import { EquipmentSetModel } from "../equipmentSetModel";
import { EquipmentItemModel } from "../equipmentItemModel";
import { StatusEffectModel } from "../statusEffectModel";

export class EquipmentSetPageModel {

  equipmentSetModel!: EquipmentSetModel;

  equipmentItemModelList!: EquipmentItemModel[];
  statusEffectModelList!: StatusEffectModel[];

  constructor(init:Partial<EquipmentSetPageModel>) {  
    Object.assign(this, init);

    this.equipmentSetModel = new EquipmentSetModel(this.equipmentSetModel);

    this.equipmentItemModelList = this.equipmentItemModelList.map((model) => new EquipmentItemModel(model));
    this.statusEffectModelList  = this.statusEffectModelList .map((model) => new StatusEffectModel (model));
  }
}