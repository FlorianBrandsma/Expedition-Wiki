export class MailEventModel {

  id!: number;

  eventName!: string;
  
  itemQuantity!: number;

  constructor(init:Partial<MailEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Mail Event';
  }
}