import NumberToAlphabet from "../../services/styleManager";
import { WorldInteractableModel } from "./worldInteractableModel";

export class WorldInteractableReflectionModel {

  id!: number;

  type!: number;

  orderNumber!: number;

  worldInteractableModelList!: WorldInteractableModel[];

  constructor(init:Partial<WorldInteractableReflectionModel>) {  
    Object.assign(this, init);

    this.worldInteractableModelList = this.worldInteractableModelList.map((model) => new WorldInteractableModel(model));
  }

  get worldInteractableModel(): WorldInteractableModel {
    return this.worldInteractableModelList[0];
  }

  get name(): string {
    return `${this.worldInteractableModel.name} ${(this.orderNumber > 0 ? `${NumberToAlphabet(this.orderNumber)}` : '')}`;
  }
}