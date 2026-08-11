export class SpellDischargeAbilityModel {

  id!: number;

  mana!: number;

  abilityName!: string;
  abilityDescription!: string;
  
  abilityIconResourceName!: string;

  constructor(init:Partial<SpellDischargeAbilityModel>) {  
    Object.assign(this, init);
  }
};