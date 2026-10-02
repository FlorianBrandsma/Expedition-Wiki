export class LootItemEventModel {

  constructor(init:Partial<LootItemEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Loot Item';
  }
}