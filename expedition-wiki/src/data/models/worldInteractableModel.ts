import { WorldInteractableType } from "../../types/enums";

export class WorldInteractableModel {

  id!: string;

  terrainId!: number;
  questId!: number;

  type!: number;

  name!: string;

  iconResourceName!: string;

  constructor(init:Partial<WorldInteractableModel>) {  
    Object.assign(this, init);
  }

  get parentTypeDescription(): string {
    return this.terrainId > 0 ? 'terrain' :
           this.questId   > 0 ? 'quest'   :
                                'objective';
  }

  get typeDescription(): string {
    return WorldInteractableType[this.type];
  }
}