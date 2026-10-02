export class TradeItemEventModel {

  constructor(init:Partial<TradeItemEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Trade Item';
  }
}