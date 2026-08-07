import { AgentInteractableType } from "../../types/enums";
import { CharacterAgentInteractableModel } from "./characterAgentInteractableModel";

export class AgentInteractableModel {

  type!: number;

  elementType!: number;

  health!: number;
  mana!: number;
  physicalAttack!: number;
  magicalAttack!: number;
  physicalDefence!: number;
  magicalDefence!: number;

  characterAgentInteractableModelList!: CharacterAgentInteractableModel[];

  constructor(init:Partial<AgentInteractableModel>) {  
    Object.assign(this, init);

    this.characterAgentInteractableModelList = this.characterAgentInteractableModelList.map((model) => new CharacterAgentInteractableModel(model));
  }

  get characterAgentInteractableModel(): CharacterAgentInteractableModel {  
    return this.characterAgentInteractableModelList[0];
  }

  get typeDescription(): string {
  
    return `${AgentInteractableType[this.type]} Agent`;
  }
}