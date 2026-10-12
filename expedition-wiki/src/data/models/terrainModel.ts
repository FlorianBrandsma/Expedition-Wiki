import { ChunkModel } from "./chunkModel";
import { WaypointModel } from "./waypointModel";
import type { WorldObjectReflectionModel } from "./worldObjectReflectionModel";

export class TerrainModel {
  
  id!: number;

  name!: string;

  terrainSize!: number;
  chunkSize!: number;

  regionName!: string;

  tileSize!: number;

  tileSetResourceName!: string;

  chunkModelList!: ChunkModel[];

  waypointModelList!: WaypointModel[];

  constructor(init:Partial<TerrainModel>) {  
    Object.assign(this, init);

    this.chunkModelList    = this.chunkModelList   .map((model) => new ChunkModel   (model));

    this.waypointModelList = this.waypointModelList.map((model) => new WaypointModel(model));
  }

  get mapGrid(): number[][] {

    const gridSize = this.terrainSize * this.chunkSize;
    
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
  
    this.chunkModelList.forEach((chunkModel) => {
    
      chunkModel.chunkTileModelList.forEach((chunkTileModel) => {

        const row    = (Math.floor(chunkModel.orderNumber / this.terrainSize) * this.chunkSize) + Math.floor(chunkTileModel.orderNumber / this.chunkSize);
        const column =           ((chunkModel.orderNumber % this.terrainSize) * this.chunkSize) +           (chunkTileModel.orderNumber % this.chunkSize);

        grid[row][column] = chunkTileModel.tileOrderNumber;
      })
    })

    return grid;
  }

  get worldObjectReflectionModelList(): WorldObjectReflectionModel[] {
    return this.chunkModelList.flatMap(chunkModel => chunkModel.worldObjectReflectionModelList);
  }
}