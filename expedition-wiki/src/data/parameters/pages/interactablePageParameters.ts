import type { IParameters } from "../interfaces";

export class InteractablePageParameters implements IParameters {

  readonly dataType: string = 'InteractablePage';

  gameId?: number[];
  
  name?: string;

  constructor(init?:Partial<InteractablePageParameters>) {
    Object.assign(this, init);
  }
}