export class LimitedItemEventItemModel {

  quantity!: number;
  boundToReflection!: boolean;

  constructor(init:Partial<LimitedItemEventItemModel>) {  
    Object.assign(this, init);
  }

  get quantityDescription(): string {
    return `${this.quantity}${(this.boundToReflection ? ' per reflection' : '')}`;
  }
}