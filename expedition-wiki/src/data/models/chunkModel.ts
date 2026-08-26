export class ChunkModel {
  
  id!: number;

  orderNumber!: number;

  constructor(init:Partial<ChunkModel>) {  
    Object.assign(this, init);
  }

  get name(): string {
    return `Chunk ${this.orderNumber + 1}`;
  }
}