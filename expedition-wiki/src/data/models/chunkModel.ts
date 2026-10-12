import { ChunkTileModel } from "./chunkTileModel";
import { WorldObjectReflectionModel } from "./worldObjectReflectionModel";

export class ChunkModel {
  
  id!: number;

  orderNumber!: number;

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
}