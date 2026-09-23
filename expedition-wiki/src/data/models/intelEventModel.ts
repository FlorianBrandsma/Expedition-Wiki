export class IntelEventModel {

  constructor(init:Partial<IntelEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Intel';
  }
}