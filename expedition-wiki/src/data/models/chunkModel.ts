import type { MapCoordinates } from "../../services/interfaces";
import { ChunkTileModel } from "./chunkTileModel";
import { WorldObjectReflectionModel } from "./worldObjectReflectionModel";

export class ChunkModel {

  orderNumber!: number;

  terrainSize!: number;
  chunkSize!: number;
  tileSize!: number;

  chunkTileModelList!:             ChunkTileModel[];
  worldObjectReflectionModelList!: WorldObjectReflectionModel[];

  constructor(init:Partial<ChunkModel>) {  
    Object.assign(this, init);

    this.chunkTileModelList             = this.chunkTileModelList            .map((model) => new ChunkTileModel            (model));
    this.worldObjectReflectionModelList = this.worldObjectReflectionModelList.map((model) => new WorldObjectReflectionModel(model));
  }

  get name(): string {
    return `Chunk ${this.orderNumber + 1}`;
  }

  get startCoordinates(): MapCoordinates {

    const positionX =           (this.orderNumber % this.terrainSize);
    const positionY = Math.floor(this.orderNumber / this.terrainSize);
    
    const mapCoordinates = {
      x: positionX,
      z: positionY
    } as MapCoordinates;

    return mapCoordinates;
  }

  get centerCoordinates(): MapCoordinates {

    const startPosition = this.startCoordinates;

    const scale = this.chunkSize * this.tileSize;

    const positionX = (scale / 2) + startPosition.x * scale;
    const positionZ = (scale / 2) + startPosition.z * scale;

    return {
      x: positionX,
      z: positionZ
    };
  }
}