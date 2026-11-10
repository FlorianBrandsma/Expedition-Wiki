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

    return {
      x: positionX,
      z: positionY
    };
  }

  get centerCoordinates(): MapCoordinates {

    const startCoordinates = this.startCoordinates;
    const size = this.chunkSize * this.tileSize;

    const positionX = (size / 2) + startCoordinates.x * size;
    const positionZ = (size / 2) + startCoordinates.z * size;

    return {
      x: positionX,
      z: positionZ
    };
  }

  get boundsCoordinates(): MapCoordinates[] {

    const size = this.chunkSize * this.tileSize;

    return [{ x: this.startCoordinates.z * size,        z: this.startCoordinates.x * size },
            { x: this.startCoordinates.z * size + size, z: this.startCoordinates.x * size + size }];
  }
}