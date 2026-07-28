export class EventEffectModel {

  description!: string;

  constructor(init:Partial<EventEffectModel>) {  
    Object.assign(this, init);
  }
};