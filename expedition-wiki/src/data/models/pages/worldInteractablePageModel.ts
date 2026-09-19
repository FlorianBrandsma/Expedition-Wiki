import { WorldInteractableModel } from "../worldInteractableModel";
import { TaskModel } from "../taskModel";

export class WorldInteractablePageModel {

  worldInteractableModel!: WorldInteractableModel;

  taskModelList!: TaskModel[];

  constructor(init:Partial<WorldInteractablePageModel>) {  
    Object.assign(this, init);

    this.worldInteractableModel = new WorldInteractableModel(this.worldInteractableModel);

    this.taskModelList = this.taskModelList.map((model) => new TaskModel(model));
  }
}