export class RestEventModel {

  id!: number;

  quantity!: string;
  
  eventName!: string;

  constructor(init:Partial<RestEventModel>) {  
    Object.assign(this, init);
  }

  get typeDescription(): string {
    return 'Rest Event';
  }
}