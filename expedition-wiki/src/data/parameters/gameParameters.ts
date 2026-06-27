import type { IParameters } from "./interfaces";

export class GameParameters implements IParameters {

  readonly dataType: string = "Game";

  id?: number[];
  excludeId?: number[];

  releaseCandidateId?: number[];
  releaseId?: number[];

  name?: string;

  constructor(init?:Partial<GameParameters>) {
    Object.assign(this, init);
  }
}