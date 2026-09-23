export class TaskModel {

  id!: string;

  name!: string;

  completeObjective!: boolean;
  repeatable!: boolean;

  worldInteractableType!: number;
  worldInteractableParentType!: number;

  worldInteractableName!: string;

  worldInteractableIconResourceName!: string;

  regionName!: string;
  terrainName!: string;

  questName!: string;
  objectiveName!: string;

  constructor(init:Partial<TaskModel>) {  
    Object.assign(this, init);
  }
}