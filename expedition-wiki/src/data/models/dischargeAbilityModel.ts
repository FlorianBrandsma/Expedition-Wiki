import { DischargeAbilityType } from "../../types/enums";
import { ArmDischargeAbilityModel } from "./armDischargeAbilityModel";
import { SpellDischargeAbilityModel } from "./spellDischargeAbilityModel";

export class DischargeAbilityModel {

  type!: number;

  targetRelationshipType!: number;
  targetCombatState!: number;

  affectedRelationshipType!: number;
  affectedCombatState!: number;

  armDischargeAbilityModelList!: ArmDischargeAbilityModel[];
  spellDischargeAbilityModelList!: SpellDischargeAbilityModel[];

  constructor(init:Partial<DischargeAbilityModel>) {  
    Object.assign(this, init);

    this.armDischargeAbilityModelList   = this.armDischargeAbilityModelList  .map((model) => new ArmDischargeAbilityModel  (model));
    this.spellDischargeAbilityModelList = this.spellDischargeAbilityModelList.map((model) => new SpellDischargeAbilityModel(model));
  }

  get armDischargeAbilityModel(): ArmDischargeAbilityModel {  
    return this.armDischargeAbilityModelList[0];
  }

  get spellDischargeAbilityModel(): SpellDischargeAbilityModel {  
    return this.spellDischargeAbilityModelList[0];
  }

  get typeDescription(): string {
    return `${ DischargeAbilityType[this.type] } Discharge`;
  }

  get armEquipmentItemTypeDescription(): string {
    return this.armDischargeAbilityModel?.armEquipmentItemTypeDescription ?? '';
  }
};