import { GroupBehaviourConditionType } from "../../types/enums";

export class GroupAgentInteractableBehaviourConditionModel {

  type!: number;
  amount!: number;

  constructor(init:Partial<GroupAgentInteractableBehaviourConditionModel>) {  
    Object.assign(this, init);
  }

  get description(): string {
    return `${GroupBehaviourConditionType[this.type]}: ${this.amount}+ present`;
  }
}