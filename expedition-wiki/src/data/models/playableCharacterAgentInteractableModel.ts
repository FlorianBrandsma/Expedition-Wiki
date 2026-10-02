export class PlayableCharacterAgentInteractableModel {

  id!: number;

  interactableName!: string;
  iconResourceName!: string;

  constructor(init:Partial<PlayableCharacterAgentInteractableModel>) {  
    Object.assign(this, init);
  }
}