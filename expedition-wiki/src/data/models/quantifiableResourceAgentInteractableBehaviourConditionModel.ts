import { ResourceAmountType, ResourceBehaviourConditionInequalityType, ResourceType } from "../../types/enums";

import type { ResourceAgentInteractableBehaviourConditionModel } from "./resourceAgentInteractableBehaviourConditionModel";

export class QuantifiableResourceAgentInteractableBehaviourConditionModel {

  amount!: number;
  amountType!: number;

  resourceAgentInteractableBehaviourConditionModel: ResourceAgentInteractableBehaviourConditionModel;

  constructor(init:Partial<QuantifiableResourceAgentInteractableBehaviourConditionModel>, resourceAgentInteractableBehaviourConditionModel: ResourceAgentInteractableBehaviourConditionModel) {  
    Object.assign(this, init);

    this.resourceAgentInteractableBehaviourConditionModel = resourceAgentInteractableBehaviourConditionModel;
  }

  get description(): string {
    return `${ResourceType[this.resourceAgentInteractableBehaviourConditionModel.resourceType]} ${ResourceBehaviourConditionInequalityType[this.resourceAgentInteractableBehaviourConditionModel.inequalityType].toLowerCase()} ${this.amount}${ResourceAmountType[this.amountType] === 'Percent' ? '%' : ''}`;
  }
}