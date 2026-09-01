import { TargetBehaviourConditionType } from "../../types/enums";

export class TargetAgentInteractableBehaviourConditionModel {

  type!: number;

  constructor(init:Partial<TargetAgentInteractableBehaviourConditionModel>) {  
    Object.assign(this, init);
  }

  get description(): string {
    return TargetBehaviourConditionType[this.type];    
  }
}