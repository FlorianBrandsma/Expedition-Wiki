export class DistributeItemEventModel {

  constructor(init:Partial<DistributeItemEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Distribute Item';
  }
}