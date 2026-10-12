export class ChunkTileModel {

  orderNumber!: number;

  tileSetResourceName!: string;

  tileOrderNumber!: number;

  constructor(init:Partial<ChunkTileModel>) {  
    Object.assign(this, init);
  }
}