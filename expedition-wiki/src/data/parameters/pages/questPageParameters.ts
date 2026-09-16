import type { IParameters } from "../interfaces";

export class QuestPageParameters implements IParameters {

  readonly dataType: string = 'QuestPage';

  gameId?: number[];
  
  name?: string;

  constructor(init?:Partial<QuestPageParameters>) {
    Object.assign(this, init);
  }
}