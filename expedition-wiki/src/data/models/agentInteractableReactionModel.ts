import { CaseConditionModel } from "./caseConditionModel";

export class AgentInteractableReactionModel {

  id!: number;

  successChance!: number;

  agentInteractableName!: string;
  agentInteractableAssetIconResourceName!: string;

  eventName!: string;

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<AgentInteractableReactionModel>) {  
    Object.assign(this, init);

    this.caseConditionModelList = this.caseConditionModelList.map((model) => new CaseConditionModel(model));
  }

  get successChanceDescription(): string {
    return `${this.successChance}%`;
  }
}