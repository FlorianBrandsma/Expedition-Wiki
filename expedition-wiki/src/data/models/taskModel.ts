import { WorldInteractableParentType, WorldInteractableType } from "../../types/enums";

export class TaskModel {

  id!: string;

  name!: string;

  completeObjective!: boolean;
  repeatable!: boolean;

  worldInteractableType!: number;
  worldInteractableParentType!: number;

  worldInteractableName!: string;

  worldInteractableIconResourceName!: string;

  worldInteractableRegionName!: string;
  worldInteractableTerrainName!: string;

  questName!: string;
  objectiveName!: string;

  constructor(init:Partial<TaskModel>) {  
    Object.assign(this, init);
  }

  get originType(): string {
    return this.objectiveName                ? 'objective' :
           this.worldInteractableTerrainName ? 'terrain'   : '';
  }

  get parentParams(): string[] {
    return this.originType === 'objective' ? [this.questName,                   this.objectiveName]                  :
           this.originType === 'terrain'   ? [this.worldInteractableRegionName, this.worldInteractableTerrainName ] : [];
  }

  get params(): string[] {

    const params = [
      this.originType,
      ...this.parentParams,
      'interactable',
      WorldInteractableType      [this.worldInteractableType]      .toLowerCase(),
      WorldInteractableParentType[this.worldInteractableParentType].toLowerCase(),
      this.worldInteractableName,
      'task',
      this.name
    ]

    return params;
  }
}