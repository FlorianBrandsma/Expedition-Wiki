export class TerrainModel {
  
  id!: number;

  name!: string;

  regionName!: string;

  constructor(init:Partial<TerrainModel>) {  
    Object.assign(this, init);
  }
}