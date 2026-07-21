import type { IParameters } from "./interfaces";

export const ClassRequestType = {
  Custom: 0,
  GetFilterClasses: 1
}  as const;

export class ClassParameters implements IParameters {

  readonly dataType: string = "Class";

  requestType?: (typeof ClassRequestType)[keyof typeof ClassRequestType];

  includeDependencies?: boolean;

  id?: number[];
  excludeId?: number[];
  gameId?: number[];

  name?: string;

  constructor(init?:Partial<ClassParameters>) {
    Object.assign(this, init);
  }
}