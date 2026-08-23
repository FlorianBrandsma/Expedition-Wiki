import type { IParameters } from "../interfaces";

export class ClassPageParameters implements IParameters {

  readonly dataType: string = 'ClassPage';

  gameId?: number[];
  
  name?: string;

  constructor(init?:Partial<ClassPageParameters>) {
    Object.assign(this, init);
  }
}