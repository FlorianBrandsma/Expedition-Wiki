export class DialogueEventModel {

  constructor(init:Partial<DialogueEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Dialogue';
  }
}