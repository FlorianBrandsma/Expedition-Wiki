import { WorldInteractableType } from "../../types/enums";
import { TaskModel } from "./taskModel";

export class WorldInteractableModel {

  id!: string;

  terrainId!: number;
  questId!: number;

  type!: number;

  terrainName!: string;
  regionName!: string;

  name!: string;

  iconResourceName!: string;

  taskModelList!: TaskModel[];

  constructor(init:Partial<WorldInteractableModel>) {  
    Object.assign(this, init);

    this.taskModelList = this.taskModelList.map((model) => new TaskModel(model));
  }

  get parentTypeDescription(): string {
    return this.terrainId > 0 ? 'Terrain' :
           this.questId   > 0 ? 'Quest'   :
                                'Objective';
  }

  get typeDescription(): string {
    return WorldInteractableType[this.type];
  }
}