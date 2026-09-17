import { ObjectiveModel } from "../objectiveModel";
import { WorldInteractableModel } from "../worldInteractableModel";

export class ObjectivePageModel {

  objectiveModel!: ObjectiveModel;

  objectiveModelList!: ObjectiveModel[];

  worldInteractableModelList!: WorldInteractableModel[];

  constructor(init:Partial<ObjectivePageModel>) {  
    Object.assign(this, init);

    this.objectiveModel = new ObjectiveModel(this.objectiveModel);

    this.objectiveModelList         = this.objectiveModelList        .map((model) => new ObjectiveModel        (model));

    this.worldInteractableModelList = this.worldInteractableModelList.map((model) => new WorldInteractableModel(model));
  }
}