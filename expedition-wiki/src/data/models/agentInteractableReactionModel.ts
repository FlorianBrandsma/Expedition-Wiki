import { CaseConditionModel } from "./caseConditionModel";
import { EventModel } from "./eventModel";

export class AgentInteractableReactionModel {

  id!: number;

  successChance!: number;

  agentInteractableName!: string;
  agentInteractableAssetIconResourceName!: string;

  eventName!: string;

  eventModel!: EventModel;

  caseConditionModelList!: CaseConditionModel[];

  constructor(init:Partial<AgentInteractableReactionModel>) {  
    Object.assign(this, init);

    if (this.eventModel) this.eventModel = new EventModel(this.eventModel);

    this.caseConditionModelList = this.caseConditionModelList.map((model) => new CaseConditionModel(model));
  }

  get successChanceDescription(): string {
    return `${this.successChance}%`;
  }
}