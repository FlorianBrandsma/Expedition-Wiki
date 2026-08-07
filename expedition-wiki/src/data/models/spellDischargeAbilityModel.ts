export class SpellDischargeAbilityModel {

  mana!: number;

  constructor(init:Partial<SpellDischargeAbilityModel>) {  
    Object.assign(this, init);
  }
};