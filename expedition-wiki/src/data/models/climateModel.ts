import { ChunkModel } from "./chunkModel";

export class ClimateModel {
  
  id!: number;

  name!: string;

  terrainName!: string;
  regionName!: string;

  iconResourceName!: string;

  chunkModelList!: ChunkModel[];

  constructor(init:Partial<ClimateModel>) {  
    Object.assign(this, init);
    
    this.chunkModelList = this.chunkModelList.map((model) => new ChunkModel(model));
  }
}