export class SpeechEventModel {

  constructor(init:Partial<SpeechEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Speech';
  }
}