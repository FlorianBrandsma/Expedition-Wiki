import { ResourceBehaviourConditionInequalityType, ResourceBehaviourConditionType, ResourceType } from "../../types/enums";

import { QuantifiableResourceAgentInteractableBehaviourConditionModel } from "./quantifiableResourceAgentInteractableBehaviourConditionModel";

export class ResourceAgentInteractableBehaviourConditionModel {

  type!: number;

  resourceType!: number;
  inequalityType!: number;

  quantifiableResourceAgentInteractableBehaviourConditionModelList!: QuantifiableResourceAgentInteractableBehaviourConditionModel[];

  constructor(init:Partial<ResourceAgentInteractableBehaviourConditionModel>) {  
    Object.assign(this, init);

    this.quantifiableResourceAgentInteractableBehaviourConditionModelList = this.quantifiableResourceAgentInteractableBehaviourConditionModelList.map((model) => new QuantifiableResourceAgentInteractableBehaviourConditionModel(model, this));
  }

  get quantifiableResourceAgentInteractableBehaviourConditionModel(): QuantifiableResourceAgentInteractableBehaviourConditionModel {
    return this.quantifiableResourceAgentInteractableBehaviourConditionModelList[0];
  }

  get description(): string {

    switch (ResourceBehaviourConditionType[this.type])
    {
      case 'Quantifiable': return this.quantifiableResourceAgentInteractableBehaviourConditionModel!.description;
      case 'Absolute':     return this.absoluteResourceAgentInteractableBehaviourConditionDescription;
    }
  }

  get absoluteResourceAgentInteractableBehaviourConditionDescription(): string {
    return `${ResourceBehaviourConditionInequalityType[this.inequalityType]} ${ResourceType[this.resourceType].toLowerCase()}`;
  }
}