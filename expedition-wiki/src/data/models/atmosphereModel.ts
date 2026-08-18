export class AtmosphereModel {

  id!: number;

  statusEffectStack!: number;

  constructor(init:Partial<AtmosphereModel>) {  
    Object.assign(this, init);
  }
}