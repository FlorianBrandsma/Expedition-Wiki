export class TransportEventModel {

  constructor(init:Partial<TransportEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Transport';
  }
}