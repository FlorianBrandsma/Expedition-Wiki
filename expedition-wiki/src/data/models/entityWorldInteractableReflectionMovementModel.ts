import { EntityWorldInteractableReflectionMovementDestinationModel } from "./entityWorldInteractableReflectionMovementDestinationModel";

export class EntityWorldInteractableReflectionMovementModel {

  entityWorldInteractableReflectionMovementDestinationModelList!: EntityWorldInteractableReflectionMovementDestinationModel[];

  constructor(init:Partial<EntityWorldInteractableReflectionMovementModel>) {  
    Object.assign(this, init);

    this.entityWorldInteractableReflectionMovementDestinationModelList = this.entityWorldInteractableReflectionMovementDestinationModelList.map((model) => new EntityWorldInteractableReflectionMovementDestinationModel(model));
  }
}