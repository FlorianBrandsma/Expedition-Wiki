export class LootEventModel {

  constructor(init:Partial<LootEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Loot';
  }
}