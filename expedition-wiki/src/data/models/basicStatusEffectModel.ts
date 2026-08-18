export class BasicStatusEffectModel {

  description!: string;
  
  constructor(init:Partial<BasicStatusEffectModel>) {  
    Object.assign(this, init);
  }
}