export class PlayableCharacterAgentInteractableModel {

  interactableName!: string;
  iconResourceName!: string;

  constructor(init:Partial<PlayableCharacterAgentInteractableModel>) {  
    Object.assign(this, init);
  }
}