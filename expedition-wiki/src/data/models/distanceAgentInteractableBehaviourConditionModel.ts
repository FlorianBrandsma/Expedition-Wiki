import { DistanceBehaviourConditionType } from "../../types/enums";

export class DistanceAgentInteractableBehaviourConditionModel {

  type!: number;

  constructor(init:Partial<DistanceAgentInteractableBehaviourConditionModel>) {  
    Object.assign(this, init);
  }

  get description(): string {
    return DistanceBehaviourConditionType[this.type];
  }
}