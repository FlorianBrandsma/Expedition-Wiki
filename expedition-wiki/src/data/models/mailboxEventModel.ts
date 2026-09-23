export class MailboxEventModel {

  constructor(init:Partial<MailboxEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Mailbox';
  }
}