import { AbilityType } from "../../types/enums";
import { ActionDelayModel } from "./actionDelayModel";
import { ChargeAbilityModel } from "./chargeAbilityModel";
import { DischargeAbilityModel } from "./dischargeAbilityModel";
import { EffectModel } from "./effectModel";

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

  effectStack!: number;

  chargeAbilityModelList!:    ChargeAbilityModel[];
  dischargeAbilityModelList!: DischargeAbilityModel[];

  effectModelList!: EffectModel[];
  actionDelayModelList!: ActionDelayModel[];

  constructor(init:Partial<AbilityModel>) {  
    Object.assign(this, init);

    this.cooldownDuration = Number(init.cooldownDuration!.toFixed(2));

    this.chargeAbilityModelList    = this.chargeAbilityModelList   .map((model) => new ChargeAbilityModel   (model));
    this.dischargeAbilityModelList = this.dischargeAbilityModelList.map((model) => new DischargeAbilityModel(model));

    this.effectModelList           = this.effectModelList          .map((model) => new EffectModel          (model));
    this.actionDelayModelList      = this.actionDelayModelList     .map((model) => new ActionDelayModel     (model));
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

  get targetTypeDescription(): string {
    return this.dischargeAbilityModel?.targetTypeDescription ?? ''; 
  }

  get affectedTypeDescription(): string {

    switch (AbilityType[this.type])
    {
      case 'Charge':    return this.chargeAbilityModel   !.relationshipTypeDescription;
      case 'Discharge': return this.dischargeAbilityModel!.relationshipTypeDescription;
    }
  }

  get mana(): number {
    return this.dischargeAbilityModel?.spellDischargeAbilityModel?.mana ?? 0;
  }
}