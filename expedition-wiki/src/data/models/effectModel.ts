export class EffectModel {
  id!: number;
  type!: number;

  name!: string;

  iconResourceName!: string;

  constructor(init:Partial<EffectModel>) {  
    Object.assign(this, init);
  }
};