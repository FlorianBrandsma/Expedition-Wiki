import { CaseConditionModel } from "./caseConditionModel";
import { EventModel } from "./eventModel";

export class AgentInteractableReactionModel {

  id!: number;

  successChance!: number;

  agentInteractableName!: string;
  agentInteractableAssetIconResourceName!: string;

  eventName!: string;

  caseConditionModelList!: CaseConditionModel[];
  
  eventModelList!: EventModel[];

  constructor(init:Partial<AgentInteractableReactionModel>) {  
    Object.assign(this, init);

    this.caseConditionModelList = this.caseConditionModelList.map((model) => new CaseConditionModel(model));

    this.eventModelList         = this.eventModelList        .map((model) => new EventModel       (model));
  }

  get eventModel(): EventModel {
    return this.eventModelList[0];
  }

  get successChanceDescription(): string {
    return `${this.successChance}%`;
  }
}