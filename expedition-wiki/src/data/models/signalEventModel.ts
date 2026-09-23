export class SignalEventModel {

  constructor(init:Partial<SignalEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Signal';
  }
}