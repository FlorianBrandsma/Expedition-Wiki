import type { IParameters } from "../interfaces";

export class TerrainPageParameters implements IParameters {

  readonly dataType: string = 'TerrainPage';

  gameId?: number[];
  
  terrainName?: string;
  regionName?: string;

  constructor(init?:Partial<TerrainPageParameters>) {
    Object.assign(this, init);
  }
}