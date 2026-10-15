export class SpellDischargeAbilityModel {

  mana!: number;

  abilityName!: string;
  abilityDescription!: string;
  
  abilityIconResourceName!: string;

  constructor(init:Partial<SpellDischargeAbilityModel>) {  
    Object.assign(this, init);
  }
}