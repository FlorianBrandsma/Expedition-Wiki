import { DisableStatusEffectType } from "../../types/enums";

export class DisableStatusEffectModel {

  type!: number;
  
  constructor(init:Partial<DisableStatusEffectModel>) {  
    Object.assign(this, init);
  }

  description(): string {
    return `Disable ${ DisableStatusEffectType[this.type].toLowerCase()} input`;
  }
}