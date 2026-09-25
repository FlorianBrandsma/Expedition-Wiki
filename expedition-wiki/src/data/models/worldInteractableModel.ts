import { WorldInteractableParentType, WorldInteractableType } from "../../types/enums";

import { EntityWorldInteractableModel } from "./entityWorldInteractableModel";
import { WorldInteractableReflectionModel } from "./worldInteractableReflectionModel";
import { TaskModel } from "./taskModel";

export class WorldInteractableModel {

  id!: string;

  type!: number;

  terrainName!: string;
  regionName!: string;

  questName!: string;
  objectiveName!: string;

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

  get originType(): string {
    return this.objectiveName ? 'objective' :
           this.terrainName   ? 'terrain'   : '';
  }

  get parentParams(): string[] {
    return this.originType === 'objective' ? [this.questName,  this.objectiveName] :
           this.originType === 'terrain'   ? [this.regionName, this.terrainName]   : [];
  }

  get params(): string[] {
    console.log(this);
    const params = [
      this.originType,
      ...this.parentParams,
      'interactable',
      WorldInteractableType      [this.type]                       .toLowerCase(),
      WorldInteractableParentType[this.worldInteractableParentType].toLowerCase(),
      this.name
    ]

    return params;
  }
}