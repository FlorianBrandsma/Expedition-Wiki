import { CombatCaseConditionEngagementType, CombatState } from "../../types/enums";

export class CombatCaseConditionModel {

  combatState!: number;

  engagementType!: number;
  
  constructor(init:Partial<CombatCaseConditionModel>) {  
    Object.assign(this, init);
  }

  description(): string {
    return `Combat state: ${CombatState[this.combatState].toLowerCase()}${(CombatCaseConditionEngagementType[this.engagementType] !== 'Either' ? `, ${CombatCaseConditionEngagementType[this.engagementType].toLowerCase()}`: '')}`;
  }
}