export class PartyEventModel {

  constructor(init:Partial<PartyEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Party';
  }
}