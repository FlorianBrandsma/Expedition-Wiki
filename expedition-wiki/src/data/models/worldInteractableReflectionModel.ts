export class WorldInteractableReflectionModel {

  type!: number;

  constructor(init:Partial<WorldInteractableReflectionModel>) {  
    Object.assign(this, init);
  }
}