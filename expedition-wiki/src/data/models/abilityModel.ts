import { AbilityType } from "../../types/enums";
import { ChargeAbilityModel } from "./chargeAbilityModel";
import { DischargeAbilityModel } from "./dischargeAbilityModel";

export class AbilityModel {
  
  id!: number;
  type!: number;

  name!: string;
  description!: string;
  
  energy!: number;
  enmity!: number;

  cooldownDuration!: number;

  executions!: number;

  iconResourceName!: string;

  chargeAbilityModelList!:    ChargeAbilityModel[];
  dischargeAbilityModelList!: DischargeAbilityModel[];

  constructor(init:Partial<AbilityModel>) {  
    Object.assign(this, init);

    this.cooldownDuration = Number(init.cooldownDuration!.toFixed(2));

    this.chargeAbilityModelList    = this.chargeAbilityModelList   .map((model) => new ChargeAbilityModel   (model));
    this.dischargeAbilityModelList = this.dischargeAbilityModelList.map((model) => new DischargeAbilityModel(model));
  }

  get chargeAbilityModel(): ChargeAbilityModel {  
    return this.chargeAbilityModelList[0];
  }

  get dischargeAbilityModel(): DischargeAbilityModel {  
    return this.dischargeAbilityModelList[0];
  }

  get typeDescription(): string {
    
    switch (AbilityType[this.type])
    {
      case 'Charge':    return this.chargeAbilityModel   !.typeDescription;
      case 'Discharge': return this.dischargeAbilityModel!.typeDescription;
    }
  }

  get armEquipmentItemTypeDescription(): string {

    switch (AbilityType[this.type])
    {
      case 'Charge':    return this.chargeAbilityModel   !.armEquipmentItemTypeDescription;
      case 'Discharge': return this.dischargeAbilityModel!.armEquipmentItemTypeDescription;
    }
  }
};