import type { IParameters } from "./interfaces";

export const TerrainRequestType = {
  Custom: 0,
  GetFilterTerrains: 1
}  as const;

export class TerrainParameters implements IParameters {

  readonly dataType: string = "Terrain";

  requestType?: (typeof TerrainRequestType)[keyof typeof TerrainRequestType];

  id?: number[];
  excludeId?: number[];

  gameId?: number[];

  name?: string;

  constructor(init?:Partial<TerrainParameters>) {
    Object.assign(this, init);
  }
}