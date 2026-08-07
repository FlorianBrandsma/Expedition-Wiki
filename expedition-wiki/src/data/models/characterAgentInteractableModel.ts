import { CharacterAgentInteractableType } from "../../types/enums";

export class CharacterAgentInteractableModel {

  type!: number;
  
  className!: string;

  constructor(init:Partial<CharacterAgentInteractableModel>) {  
    Object.assign(this, init);
  }

  get playable(): boolean {
    return CharacterAgentInteractableType[this.type] === 'Playable';
  }
};