export class EffectEventModel {

  id!: number;

  eventName!: string;
  
  effectStack!: number;

  constructor(init:Partial<EffectEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Effect Event';
  }
};