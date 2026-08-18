export class DistributeItemEventItemModel {

  minimumQuantity!: number;
  maximumQuantity!: number;

  constructor(init:Partial<DistributeItemEventItemModel>) {  
    Object.assign(this, init);
  }

  get quantityDescription(): string {
    return `${this.minimumQuantity}${(this.maximumQuantity > this.minimumQuantity ? `-${this.maximumQuantity}` : '')}`;
  }
}