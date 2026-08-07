import { InteractableType } from "../../types/enums";
import { AgentInteractableModel } from "./agentInteractableModel";

export class InteractableModel {
  
  id!: number;
  type!: number;
  name!: string;
  
  sightRange!: number;
  hearingRange!: number;

  assetType!: number;
  assetResourceName!: string;
  assetIconResourceName!: string;

  agentInteractableModelList!: AgentInteractableModel[];

  constructor(init:Partial<InteractableModel>) {  
    Object.assign(this, init);

    this.sightRange   = Number(init.sightRange!.toFixed(2));
    this.hearingRange = Number(init.hearingRange!.toFixed(2));

    this.agentInteractableModelList = this.agentInteractableModelList.map((model) => new AgentInteractableModel(model));
  }

  get agentInteractableModel(): AgentInteractableModel {  
    return this.agentInteractableModelList[0];
  }

  get elementType(): number {
    return this.agentInteractableModel?.elementType ?? 0;
  }

  get className(): string {
    return this.agentInteractableModel?.characterAgentInteractableModel?.className ?? '';
  }

  get typeDescription(): string {

    switch (InteractableType[this.type])
    {
      case 'Agent':    return this.agentInteractableModel!.typeDescription;
      case 'Obstacle': return 'Obstacle';
    }
  }

  get playableDescription(): string {
    return this.agentInteractableModel?.characterAgentInteractableModel?.playable ? 'Yes' : 'No';
  }
};