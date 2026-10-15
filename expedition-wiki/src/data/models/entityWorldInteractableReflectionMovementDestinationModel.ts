export class EntityWorldInteractableReflectionMovementDestinationModel {

  positionX!: number;
  positionZ!: number;

  constructor(init:Partial<EntityWorldInteractableReflectionMovementDestinationModel>) {  
    Object.assign(this, init);

    this.positionX = Number(init.positionX!.toFixed(2));
    this.positionZ = Number(init.positionZ!.toFixed(2));
  }
}