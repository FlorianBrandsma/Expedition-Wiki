import { EffectAttributeStatusEffectType, ElementType, ResourceDamageType } from "../../types/enums";

export class AttributeStatusEffectModel {
  
  type!: number;

  damageType!: number;
  elementType!: number;
  amount!: number;
  amountType!: number;
  
  constructor(init:Partial<AttributeStatusEffectModel>) {  
    Object.assign(this, init);
  }

  description(stack: number): string {
    
    const descriptionHead = `${ this.amount > 0 ? 'Increase' : 'Reduce'}`;

    switch(EffectAttributeStatusEffectType[this.type])
    {
      case 'Attack': 
      case 'Defence':
        return `${descriptionHead} ${ResourceDamageType[this.damageType].toLowerCase()} ${EffectAttributeStatusEffectType[this.type].toLowerCase()} by ${Math.abs(this.amount) * stack}`;
      case 'Movement speed':
        return `${descriptionHead} ${EffectAttributeStatusEffectType[this.type].toLowerCase()} by ${Math.abs(this.amount) * stack}%`;
      case 'Damage dealt': 
      case 'Damage taken':
        return `${descriptionHead} ${ResourceDamageType[this.damageType].toLowerCase()} ${EffectAttributeStatusEffectType[this.type].toLowerCase()} by ${Math.abs(this.amount) * stack}%`;
      case 'Power':
      case 'Resistance':
        return `${descriptionHead} ${ElementType[this.elementType].toLowerCase()} ${EffectAttributeStatusEffectType[this.type].toLowerCase()} by ${Math.abs(this.amount) * stack}%`;
    }
  }
}