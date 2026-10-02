export class RelinquishItemEventModel {

  eventName!: string;
  
  constructor(init:Partial<RelinquishItemEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Relinquish Item';
  }
}