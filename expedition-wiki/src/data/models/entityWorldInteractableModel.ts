export class EntityWorldInteractableModel {

  interactableName!: string;

  interactableAssetType!: number;
  interactableAssetResourceName!: string;
  
  interactableIconResourceName!: string;

  constructor(init:Partial<EntityWorldInteractableModel>) {  
    Object.assign(this, init);
  }
}