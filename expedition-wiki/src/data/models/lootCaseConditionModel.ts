export class LootCaseConditionModel {

  containsLoot!: boolean;

  constructor(init:Partial<LootCaseConditionModel>) {  
    Object.assign(this, init);
  }

  description(): string {
    return `${(this.containsLoot ? 'Contains loot' : 'Contains no loot')}`;
  }
}