export class CombatEventModel {

  constructor(init:Partial<CombatEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Combat';
  }
}