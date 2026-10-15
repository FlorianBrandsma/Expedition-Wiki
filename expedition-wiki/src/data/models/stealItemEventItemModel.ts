export class StealItemEventItemModel {

  minimumQuantity!: number;
  maximumQuantity!: number;

  successChance!: number;

  constructor(init:Partial<StealItemEventItemModel>) {  
    Object.assign(this, init);
  }

  get quantityDescription(): string {
    return `${this.minimumQuantity}${(this.maximumQuantity > this.minimumQuantity ? `-${this.maximumQuantity}` : '')}`;
  }

  get successChanceDescription(): string {
    return `${this.successChance}%`;
  }
}