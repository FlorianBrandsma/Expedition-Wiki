import { AbsoluteInequalityType } from "../../types/enums";

export class EnmityAgentInteractableBehaviourConditionModel {

  type!: number;

  constructor(init:Partial<EnmityAgentInteractableBehaviourConditionModel>) {  
    Object.assign(this, init);
  }

  get description(): string {
    return `${AbsoluteInequalityType[this.type]} enmity`;
  }
}