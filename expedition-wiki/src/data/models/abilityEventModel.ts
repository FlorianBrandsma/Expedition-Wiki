export class AbilityEventModel {

  id!: number;

  eventName!: string;

  constructor(init:Partial<AbilityEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Ability Event';
  }
}