import type { IParameters } from "./interfaces";

export const FactionRequestType = {
  Custom: 0,
  GetFilterFactions: 1
}  as const;

export class FactionParameters implements IParameters {

  readonly dataType: string = "Faction";

  requestType?: (typeof FactionRequestType)[keyof typeof FactionRequestType];

  includeDependencies?: boolean;

  id?: number[];
  excludeId?: number[];
  gameId?: number[];

  name?: string;

  constructor(init?:Partial<FactionParameters>) {
    Object.assign(this, init);
  }
}