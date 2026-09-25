import { WorldInteractableParentType, WorldInteractableType } from "../../types/enums";

import { EntityWorldInteractableModel } from "./entityWorldInteractableModel";
import { WorldInteractableReflectionModel } from "./worldInteractableReflectionModel";
import { TaskModel } from "./taskModel";

export class WorldInteractableModel {

  id!: string;

  type!: number;

  terrainName!: string;
  regionName!: string;

  name!: string;

  iconResourceName!: string;

  worldInteractableParentType!: number;

  entityWorldInteractableModelList!: EntityWorldInteractableModel[];

  worldInteractableReflectionModelList!: WorldInteractableReflectionModel[];

  taskModelList!: TaskModel[];

  constructor(init:Partial<WorldInteractableModel>) {  
    Object.assign(this, init);

    this.entityWorldInteractableModelList     = this.entityWorldInteractableModelList    .map((model) => new EntityWorldInteractableModel    (model));

    this.worldInteractableReflectionModelList = this.worldInteractableReflectionModelList.map((model) => new WorldInteractableReflectionModel(model));

    this.taskModelList                        = this.taskModelList                       .map((model) => new TaskModel                       (model));
  }

  get entityWorldInteractableModel(): EntityWorldInteractableModel {  
    return this.entityWorldInteractableModelList[0];
  }

  get parentTypeDescription(): WorldInteractableParentType {
    return WorldInteractableParentType[this.worldInteractableParentType];
  }

  get typeDescription(): string {
    return WorldInteractableType[this.type];
  }
}