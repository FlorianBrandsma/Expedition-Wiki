import type { IParameters } from "../interfaces";

export class ClimatePageParameters implements IParameters {

  readonly dataType: string = 'ClimatePage';

  gameId?: number[];
  
  regionName?: string;
  terrainName?: string;
  climateName?: string;

  constructor(init?:Partial<ClimatePageParameters>) {
    Object.assign(this, init);
  }
}